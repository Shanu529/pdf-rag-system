import express from "express";

import { createFolderService, deleteFolderService, getAllFoldersService } from "./folder.service.js";
import { Request, Response } from "express";


export const createFolder = async (
  req: any,
  res: Response
) => {

  try {

    const { name } = req.body;

    const userId =
      req.user.userId;

    const folder =
      await createFolderService(
        name,
        userId
      );

    return res.json(folder);

  } catch (error: any) {

    return res.status(500).json({
      message:
        "Folder creation failed",
      error,
    });

  }

};


export const deleteFolder = async (req: any, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = req.user.userId;

    const folder = await deleteFolderService(id, userId);
    return res.status(200).json(folder);
  } catch (error) {
    return res.status(500).json({
      message: "Folder deletion failed",
      error,
    });
  }
};

export const getFolders =
  async (
    req: any,
    res: Response
  ) => {

    try {

      const userId = req.user.userId
      const folders = await getAllFoldersService(userId);
        
      return res.json(folders);

    } catch (error: any) {

      return res.status(500).json({
        message:
          "Failed to get folders",
      });

    }

};