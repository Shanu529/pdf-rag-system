import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "document-kafka-service",
  brokers: ["kafka:9092"],
});

export const producer = kafka.producer();

export const connectProducer = async () => {
  while (true) {
    try {
      await producer.connect();
      console.log("Kafka Producer connected");
      break;
    } catch (error) {
      console.log("waiting for kafka...");
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
};
