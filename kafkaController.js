import debug from "debug";
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

const logger = debug('node-kafka:kafkaController');
dotenv.config();

class KafkaController {
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.CLIENT_ID,
            brokers: [process.env.BROKER_1]
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({groupId: 'test-group'});
    }
    async connect(){
        await this.producer.connect();
        await this.consumer.connect();
    }
    /** *Method to create topic with multiple partitions */
    async createTopic(topicName, noOfPartition) {
        try {
            if (typeof topicName !== 'string' || topicName.trim() === '' || !/^[\w.-]+$/.test(topicName)) {
                throw new Error('Invalid topic name. Only alphanumeric characters, periods, underscores, and hyphens are allowed.');
            }

            // Ensure noOfPartition is a valid number
            const partitions = parseInt(noOfPartition);
            if (isNaN(partitions) || partitions < 1) {
                throw new Error('Invalid number of partitions. Must be a positive integer.');
            }

            // Create an admin client to manage Kafka topic
            const admin = this.kafka.admin();
            await admin.connect();
            await admin.createTopics({
                topics: [
                    {
                        topic: topicName,
                        numPartitions: partitions,
                        replicationFactor: 1
                    }
                ]
            });
            await admin.disconnect();
            
        } catch (e) {
            logger(e.message);
            throw e;
        }
    }

    async publishMessageToTopic(topicName, messages){
        try{
            if(!this.producer){
                await this.connect();
            }
            const topics = await this.listTopics();
            if(!topics.includes(topicName)){
                throw new Error(`Topic ${topicName} does not exist`)
            }
            await this.producer.send({
                topic: topicName,
                messages
            })
        }catch(e){
            logger(e.message);
            throw e;
        }finally{
            await this.producer.disconnect();
        }
    }
    async listTopics() {
        try {
            const admin = this.kafka.admin();
            await admin.connect();
            const topics = await admin.listTopics();
            await admin.disconnect();
            return topics;
        } catch (e) {
            logger(e.message);
            throw e;
        }
    }
    async consumeMessageFromTopic(topicName,callback){
         
        try{
            if(!this.consumer){
                await this.connect();
            }
            await this.consumer.subscribe({
                topic: topicName,
                fromBeginning: true,
            })
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = `Received message: ${message.value.toString()} from partition ${partition} and topic ${topic}`;
                    callback(value);
                }
            });
        }catch(e){
            logger(e.message);
            throw e;
        }
    }
}

export default KafkaController;
