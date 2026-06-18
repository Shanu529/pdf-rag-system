

import { Queue } from "bullmq";
import connection from "./redis";

export const pdfQueue = new Queue("pdf-processing", {
    connection: connection as any,
});