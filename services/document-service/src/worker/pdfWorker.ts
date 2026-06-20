import { Worker } from "bullmq";
import connection from "../queue/redis.js";
import axios from "axios";
import prisma from "../lib/prisma.js";
import { producer, connectProducer } from "../kafka/producer.js";

const startWorker = async () => {
  await connectProducer();
  new Worker(
    "pdf-processing",
    async (job) => {
      const { documentId, filePath, folderId } = job.data;

      try {
        console.log("Processing:", filePath);
        console.log("DOCUMENT ID:", documentId);

        const document = await prisma.document.findUnique({
          where: {
            id: documentId,
          },
        });

        const response = await axios.post(
          `${process.env.PYTHON_ENDPOINT}/process-pdf`,
          { filePath, docId: document?.docId, folderId },
        );

        const docId = response.data.doc_id;
        console.log("here is document id", docId);

        await prisma.document.update({
          where: {
            id: documentId,
          },
          data: {
            docId: docId,
            summary: response.data.summary,
            status: "COMPLETED",
          },
        });

        console.log("Completed:", documentId);

        await producer.send({
          topic: "pdf-processed",
          messages: [
            {
              value: JSON.stringify({
                documentId,
                docId,
                folderId,
                fileName: document?.fileName,
              }),
            },
          ],
        });

        console.log("PDF_PROCESSED EVENT SENT");
      } catch (error) {
        console.log(error);
        await prisma.document.update({
          where: {
            id: documentId,
          },
          data: {
            status: "FAILED",
          },
        });

        throw error;
      }
    },
    { connection: connection as any },
  );
};

startWorker();
