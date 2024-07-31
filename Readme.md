# Kafka: is a Event driven architecture

#### Source: `https://www.youtube.com/watch?v=AlQfpG10vAc&list=PLxoOrmZMsAWxXBF8h_TPqYJNsh3x4GyO4&index=4`,


## Terminology and Topics

#### 1) what is kafka?

- **Kafka is just like a messaging system**
- **It is a distributed platform/application**
  - **In production** evironment kafka is referred as kafka cluster.
  - A cluster is made up of more than one kafka server
  - Each kafka server is referred as **Broker**
- **It is a fault-tolerant**

  - Ability of a system to continue operating without interruption when one or more of its components fail
  - In kafka cluster messages are replicated in multiple broker (all brokers maintains the same data)
  - Replication Factor
  - nodes are keeps in different locations different tovers, so we will never loss our data. if one node fails , our messages are available in other nodes.

- **Kafka is Scalable system**

  - You can add new brokers
  - you can increase the number of consumers

- A consumer has to be associated with a consumer group
- **Zookeeper:** is a distributed open-source configuration, synchronization service.

### Steps

- download kafka from official web and unzip it.
- change the configuration in zookeeper and server property file.
- start the zookeeper.
- start the kafka server
- create a topic
- start kafka producer
- start kafka consumer
- Installation source: `https://www.youtube.com/watch?v=BwYFuhVhshI`

- after installation, add path (c:\kafka\bin\windows) to environment variables
- check version: `kafka-topics --version`
  `kafka-server-start --version`

- first we have to start zookeeper than only kafka can connected to it.

#### After installation steps
##### Practicing Kafka in CommandLine
* Source: `https://www.youtube.com/watch?v=D8YSVq06Ojg&list=PL6q0d36Q1gjBh4thO0sRLgM2QdFWAv6ZV&index=2`
--------------------------
- write docker-compose file and run
- `docker ps`
- Login to the kafka-broker: `docker exec -it container-name /bin/bash`
- `cd /opt/bitnami/kafka/bin`
- `ls -l`
- in the listed files we have to use **kafka-topics file** for creating **topics**
- **Create Topics**: `./kafka-topics.sh --bootstrap-server localhost:29092 --create --topic Topic1 --partitions1 --replication-factor 1`

- describing topics: `./kafka-topics.sh --bootstrap-server localhost:29092 --describe`

* **Run Producer**: `./kafka-console-producer.sh --bootstrap-server localhost:29092 --topic Topic1`

- If we want to Consume messages from producer,
open new terminal, first we have to login to the broker(means login to the broker container): `docker exec -it <broker-container-name> /bin/bash`
* change directory: `cd opt/bitnami/kafka/bin`
* **Run consumer**: `./kafka-console-consumer.sh --bootstrap-server localhost:29092 --topic Topic1`
--------------------------
* If you want to create another consumer and want **all previous messages**:
* common steps for all consumer creation:
* `docker exec -it <broker-container-name> /bin/bash`
* change directory: `cd opt/bitnami/kafka/bin`
* run consumer: `./kafka-console-consumer.sh --bootstrap-server localhost:29092 --topic Topic1 --from-beginning`

### Kafka In Nodejs with Kafkajs:
* create node project: `npm init -y`
* `npm i express kafkajs debug`
* edit scripts: `"start": "SET debug-node-kafka:* && nodemon index.js"`
* in package.json: `"type": "module"` this tells you can use import and export statements(ES6). defaultly it uses CommonJs syntax (require)
* next create Server: index.js file 

### Kafka Confluent Cloud Platform:

* creat account and login

---------
* A kafka topic is divided into multiple parts that is called as partition
* Partitions can be considered as the linear data structure. just like array.
* Every partition has a partition number
* Each partition has increasing index called offset
* New messages are always pushed at the read end(data is pushed from end of the partition)
* Data is Immutable after publish, so we can modify the data
* In multi broker kafka cluster partitions for a topic are distributed across the whole cluster

#### Producers:

* Producers publish message to the topics of their choice
* In reality messages are published to topic partition
* **Configuration needed by producer:**
   - bootstrap_servers: ip address or port or default port: 9092
   - topic: to which topic you want to send the message (need to connect to the particular topic)
   - value_serializer: this is a method that returns the serialized value

### Replication-Factor:

* **Definition**:The replication-factor specifies how many copies of each partition of a Kafka topic are maintained across different Kafka brokers (servers).
* **Purpose**:

   - **Durability**: Ensures that data is not lost even if a broker fails. By replicating data, Kafka can recover from hardware or software failures.
   - **Availability**: Provides high availability of data. If one broker is down, other brokers with replicas of the data can continue to serve requests.
   - **Data Distribution**:
    Each partition of the topic will be replicated to all 3 brokers.
    If one broker fails, the data can still be accessed from the other two brokers.
   - **Leader Election**:
    One of the three replicas will act as the leader for a partition, handling all read and write operations.
    The other two replicas are followers that replicate data from the leader.
   - **Failure Recovery**:
    If the leader broker fails, one of the follower replicas is promoted to become the new leader.
    Kafka ensures that the system remains available and data integrity is maintained.

    ```shell
        await admin.createTopics({
        topics: [{
          topic: 'my-topic',
          numPartitions: 3,
          replicationFactor: 3, // Sets replication factor
        }],
      });
    ```

* Producer: Sends records to a Kafka topic.
* Consumer: Reads records from a Kafka topic.
* Broker: A Kafka server that stores records and serves requests.
* Topic: A category or feed name to which records are sent.
* Partition: A topic is split into partitions for scalability and parallelism.

* **Kafka Streams**
Explanation: Kafka Streams is a client library for building applications and microservices that process and analyze real-time data streams.

Node.js Example: Kafka Streams is not directly available for Node.js. You would use libraries like kafka-streams or node-rdkafka for stream processing.

* **Kafka Connect**
Explanation: Kafka Connect is a tool for scalable and reliable streaming data between Apache Kafka and other data systems.

Node.js Example: Kafka Connect is usually configured using JSON files and is run as a separate service.

* **Consumer Groups**
Explanation: Consumer groups allow multiple consumers to share the load of processing records from a topic.

Node.js Example: Managed by KafkaJS automatically when you create a consumer with a group ID.

#### Cmd(windows) commands:
* Start Kafka Server: Ensure you have Kafka and Zookeeper installed and start them using:`.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties`
`.\bin\windows\kafka-server-start.bat .\config\server.properties`

* Create Topic: Use Kafka's command-line tools:
`.\bin\windows\kafka-topics.bat --create --topic my-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1`

* List Topics:
`.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092`

* Produce Message:
`.\bin\windows\kafka-console-producer.bat --topic my-topic --bootstrap-server localhost:9092`

* Consume Message:
`.\bin\windows\kafka-console-consumer.bat --topic my-topic --from-beginning --bootstrap-server localhost:9092`

##### Handling Offsets:
Explanation: Offsets are used to keep track of the position of messages in a topic. You need to understand how to commit and manage offsets.

```shell
    const { Kafka } = require('kafkajs');

    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092']
    });

    const consumer = kafka.consumer({ groupId: 'my-group' });

    const run = async () => {
      await consumer.connect();
      await consumer.subscribe({ topic: 'my-topic' });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(`Received message: ${message.value.toString()}`);
          // Manually commit offset
          await consumer.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
        },
      });
    };

    run().catch(console.error);

```

* **Specifying Number of Consumers:**
The number of consumers in a group is not explicitly set; it is determined by how many instances of the consumer application you run with the same groupId. Kafka handles the load balancing across these consumers.

* **Topic Configuration**
Topics are created and managed through Kafka's administrative APIs. You can create as many topics as needed, and Kafka will handle them as long as system resources are sufficient.
```shell
    await admin.createTopics({
        topics: [
          { topic: 'topic1', numPartitions: 1, replicationFactor: 1 },
          { topic: 'topic2', numPartitions: 1, replicationFactor: 1 }
          // Add more topics as needed
        ],
      });
```

* **Broker Configuration**
Although Kafka doesn’t have a specific setting to limit the number of topics, you can configure aspects related to topic handling:

num.partitions: Default number of partitions per topic.
log.retention.hours: Retention period for logs.
log.segment.bytes: Segment size for logs.

```properties

  num.partitions=3
  log.retention.hours=168
  log.segment.bytes=1073741824

```
*  Resource Considerations
Handling a large number of topics can affect broker performance. Consider the following:

Memory Usage: Each topic requires memory for metadata and data.
Disk I/O: Each topic has its own log files, impacting disk I/O.
Network: More topics can lead to increased network traffic.
Example Configuration for Resource Management:

num.io.threads: Number of threads for handling I/O operations.
num.network.threads: Number of threads for network operations.

```shell
  num.io.threads=8
  num.network.threads=3

```
* Example Monitoring:

Kafka Manager: Web UI for monitoring Kafka brokers.
Prometheus and Grafana: For metrics collection and visualization.