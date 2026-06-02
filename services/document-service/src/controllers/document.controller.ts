import { Request, Response } from "express";
import { uploadPDFService } from "../service/document.service.js";


export const uploadPDF = async (
  req: Request,
  res: Response
) => {

  try {

    const file = req.file;
    const { folderId } = req.body;


    if (!file) {

      return res.status(400).json({
        message: "No file uploaded",
      });

    }

    const data = await uploadPDFService(file, folderId);  

    return res.json(data);

  } catch (error: any) {

    return res.status(500).json({
      message: "PDF upload failed",
      error: error.message,
    });

  }

};