import { Request, Response } from "express";
import { uploadPDFService } from "../service/document.service.js";
import axios from "axios";

import prisma from "../lib/prisma.js";

export const uploadPDF = async (req: any, res: Response) => {
  try {
    const file = req.file;
    const { folderId } = req.body;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
   
    const folderService = await axios.get(
      `${process.env.FOLDER_SERVICE_URL}/api/folders/verify/${folderId}`,
    );
    

    const ownerId = folderService.data.userId;
    const currentUserId = req.user.userId;

    if (ownerId != currentUserId) {
      return res.status(403).json({
        success: false,
        message: "You do not own this folder",
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


export const getDocumentsByFolder = async (req: any, res: Response) => {
  try {
    const { folderId } = req.params;

    const documents = await prisma.document.findMany({
      where: {
        folderId,
      },
    });

    return res.json(documents);

  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to retrieve documents",
      error: error.message,
    });
  }
};
