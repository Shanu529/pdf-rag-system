import { Request, Response } from "express";
import { uploadPDFService } from "../service/document.service.js";
import axios from "axios";


export const uploadPDF = async (req: any, res: Response) => {
  try {
    console.log("STEP 4 CONTROLLER");

    console.log("FILE =", req.file);

    console.log("BODY =", req.body);
    console.log("USER =", req.user);

    const file = req.file;
    const { folderId } = req.body;

    
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    console.log("FILE:", file);
    console.log("FOLDER ID:", folderId);
    console.log(
  "VERIFY URL =",
  `${process.env.FOLDER_SERVICE_URL}/api/folders/verify/${folderId}`
);
    console.log("BEFORE VERIFY");
    const folderService = await axios.get(
      `${process.env.FOLDER_SERVICE_URL}/api/folders/verify/${folderId}`,
    );
    console.log("AFTER VERIFY");


    console.log("FOLDER RESPONSE:", folderService.data);
    console.log(folderService.data);

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
