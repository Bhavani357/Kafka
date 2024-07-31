import { Router } from "express";
import KafkaController from "./kafkaController.js"; 

const router = Router();
const kafkaController = new KafkaController(); 

router.post('/create_topic', async (req, res) => {
    try {
        const { topicName, noOfPartition } = req.body;
        await kafkaController.createTopic(topicName, noOfPartition);
        res.send({
            status: 'Ok',
            message: "Topic Successfully created"
        });
    } catch (e) {
        console.error('Error creating topic:', e);
        res.status(500).send({
            message: 'Failed to create Topic',
            error: e.message
        });
    }
});

router.post('/publish', async(req, res)=>{
    try{
        await kafkaController.connect();
        const {topicName, message} = req.body;
        const messages = [{
            key: message?.key,
            value: message?.value
        }]
        await kafkaController.publishMessageToTopic(topicName,messages);
        res.send({
            status: 'Ok',
            message: 'Message successfully published'
        })
    }catch(e){
        console.error('Error publishing topic:', e);
        res.status(500).send({
            message: 'Failed to publish message to the Topic',
            error: e.message
        });
    }
})

router.post('/consume', async(req, res)=>{
    try{
        await kafkaController.connect();
        const {topicName} = req.body;
        await kafkaController.consumeMessageFromTopic(topicName,(message)=>{
            res.send({
                status: 'Ok',
                message
            })
        });
        
    }catch(e){
        console.error('Error consuming message from topic:', e);
        res.status(500).send({
            message: 'Failed to consuming message from the Topic',
            error: e.message
        });
    }
})

export default router;
