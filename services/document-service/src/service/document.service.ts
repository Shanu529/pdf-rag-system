import axios from "axios";
import path from "path";

import prisma from "../lib/prisma.js";

export const uploadPDFService = async (file: any, folderId: string) => {
  const fullpath = path.resolve(file.path).replace(/\\/g, "/");


  console.log("PYTHON_ENDPOINT:", process.env.PYTHON_ENDPOINT);
  console.log("FOLDER_SERVICE_URL:", process.env.FOLDER_SERVICE_URL);
  // pyuthon sericese
  const response = await axios.post(
    `${process.env.PYTHON_ENDPOINT}/process-pdf`,
    {
      filePath: fullpath,
      // folderId, // python will return doc id
    },
  );

  // get doc id

  const docId = response.data.doc_id;

  // save in postgres

  const document = await prisma.document.create({
    data: {
      fileName: file.originalname,
      docId: docId,
      folderId,
    },
  });

  return {
    message: "PDF uploaded successfully",
    document,
    doc_id: docId
  };
};
