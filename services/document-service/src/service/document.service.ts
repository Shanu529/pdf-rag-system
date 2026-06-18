import axios from "axios";
import path from "path";

import prisma from "../lib/prisma.js";
import  {pdfQueue} from "../queue/pdfQueue.js";

import crypto from "crypto";

export const uploadPDFService = async (file: any, folderId: string) => {
  console.log("STEP 5 SERVICE");

  const fullpath = path.resolve(file.path).replace(/\\/g, "/");

  console.log("PYTHON_ENDPOINT =", process.env.PYTHON_ENDPOINT);

  try {
   

    // const response = await axios.post(
    //   `${process.env.PYTHON_ENDPOINT}/process-pdf`,
    //   {
    //     filePath: fullpath,
    //   },
    // );

    // const docId = response.data.doc_id;

    // if (!docId) {
    //   throw new Error("No doc_id returned from AI service");
    // }

    // console.log("DOC ID =", docId);

    const document = await prisma.document.create({
      data: {
        fileName: file.originalname,
        // docId:crypto.randomUUID(),/
        docId:  crypto.randomUUID(),
        // docId: "PROCESSING",
        folderId,
        status: "PROCESSING",
      },
    });

    await pdfQueue.add("pdf-processing",{
      documentId: document.id,
      filePath: fullpath,
      folderId,
    })

    return {
      success: true,
      document,
    };
    // return {
    //   success: true,
    //   message: "PDF uploaded successfully",
    //   document,
    //   doc_id: docId,
    // };


  } catch (error: any) {
    console.log("PYTHON CALL FAILED");

    console.log("MESSAGE =", error.message);

    console.log("STATUS =", error.response?.status);

    console.log("DATA =", error.response?.data);

    throw error;
  }
};
