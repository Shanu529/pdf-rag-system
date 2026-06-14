// import axios from "axios";
// import path from "path";

// import prisma from "../lib/prisma.js";

// export const uploadPDFService = async (file: any, folderId: string) => {
//   console.log("STEP 5 SERVICE");

//   const fullpath = path.resolve(file.path).replace(/\\/g, "/");
//   console.log("FULL PATH =", fullpath);

//   console.log("PYTHON_ENDPOINT:", process.env.PYTHON_ENDPOINT);
//   console.log("FOLDER_SERVICE_URL:", process.env.FOLDER_SERVICE_URL);
//   console.log("PYTHON_ENDPOINT =", process.env.PYTHON_ENDPOINT);
//   // pyuthon sericese
//   const response = await axios.post(
//     `${process.env.PYTHON_ENDPOINT}/process-pdf`,
//     {
//       filePath: fullpath,
//       // folderId, // python will return doc id
//     },
//   );

//   // get doc id

//   const docId = response.data.doc_id;

//   // save in postgres

//   const document = await prisma.document.create({
//     data: {
//       fileName: file.originalname,
//       docId: docId,
//       folderId,
//     },
//   });

//   return {
//     message: "PDF uploaded successfully",
//     document,
//     doc_id: docId,
//   };

// };


import axios from "axios";
import path from "path";

import prisma from "../lib/prisma.js";

export const uploadPDFService = async (
  file: any,
  folderId: string
) => {

  console.log("STEP 5 SERVICE");

  const fullpath = path
    .resolve(file.path)
    .replace(/\\/g, "/");

  console.log("FULL PATH =", fullpath);

  console.log(
    "PYTHON_ENDPOINT =",
    process.env.PYTHON_ENDPOINT
  );

  try {

    console.log("BEFORE PYTHON CALL");

    const response = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/process-pdf`,
      {
        filePath: fullpath,
      }
    );

    console.log("AFTER PYTHON CALL");

    console.log(
      "PYTHON RESPONSE =",
      response.data
    );

    const docId = response.data.doc_id;

    if (!docId) {

      throw new Error(
        "No doc_id returned from AI service"
      );

    }

    console.log("DOC ID =", docId);

    const document =
      await prisma.document.create({
        data: {
          fileName: file.originalname,
          docId,
          folderId,
        },
      });

    console.log(
      "DOCUMENT SAVED =",
      document
    );

    return {
      success: true,
      message:
        "PDF uploaded successfully",
      document,
      doc_id: docId,
    };

  } catch (error: any) {

    console.log(
      "PYTHON CALL FAILED"
    );

    console.log(
      "MESSAGE =",
      error.message
    );

    console.log(
      "STATUS =",
      error.response?.status
    );

    console.log(
      "DATA =",
      error.response?.data
    );

    throw error;

  }

};
