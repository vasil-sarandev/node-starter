import { KafkaJS } from '@confluentinc/kafka-javascript';

const KAFKA_BOOTSTRAP_SERVER = process.env.KAFKA_BOOTSTRAP_SERVER as string;
const KAFKA_SECURITY_PROTOCOL = 'plaintext';

export const KAFKA_LOGS_TOPIC = 'log';
export const KAFKA_ERRORS_TOPIC = 'error';
export const KAFKA_PRODUCTS_TOPIC = 'products';

export const kafka = new KafkaJS.Kafka().producer({
  'bootstrap.servers': KAFKA_BOOTSTRAP_SERVER,
  'security.protocol': KAFKA_SECURITY_PROTOCOL,
});

const kafkaConsumer = new KafkaJS.Kafka().consumer({
  'bootstrap.servers': KAFKA_BOOTSTRAP_SERVER,
  'group.id': 'debugging-group',
});

const connectKafkaConsumer = async () => {
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({
    topics: [KAFKA_LOGS_TOPIC, KAFKA_ERRORS_TOPIC, KAFKA_PRODUCTS_TOPIC],
  });

  kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        headers: message.headers,
        offset: message.offset,
        key: message.key?.toString(),
        value: message.value?.toString(),
      });
    },
  });
};

export const connectKafka = async () => {
  await kafka.connect();
  // this one is here for debugging purposes to consume the messages, you can safely comment this out.
  await connectKafkaConsumer();
};
