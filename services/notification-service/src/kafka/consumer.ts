import { Kafka } from "kafkajs";

import { getIO } from "../socket";
const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["kafka:9092"],
});

export const consumer = kafka.consumer({
  groupId: "notification-group",
});

export const startConsumer = async () => {
  while (true) {
    try {
      await consumer.connect();
      console.log("Consumer connected");
      await consumer.subscribe({ topic: "pdf-processed", fromBeginning: true });

      console.log("Subscribed to pdf-processed");
      break;
    } catch (error) {
      console.log("waiting for kafka...");

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value?.toString() || "");

      console.log("PDF COMPLETED EVENT RECEIVED via kafka ->", data);

      const io = getIO();
      io.emit("pdf-processed", data)
      console.log("socket notification sent")

    },
  });
};
