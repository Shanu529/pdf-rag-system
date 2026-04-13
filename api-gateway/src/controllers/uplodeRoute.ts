import axios from "axios";
import express from "express";
import path from "path";

export const uplodepdf = async (req, res) => {
  try {
    //check file
    const file = req.file;
    console.log("FILE:", file);
    if (!file) {
      return res.status(400).json({ message: "no file uploaded" });
    }

    // send to python
    const fullpath = path.resolve(file.path)
    const response = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/process-pdf`,
      {
        filePath: fullpath,
      },
    );

    // get response
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "something want wrong", error });
  }
};
