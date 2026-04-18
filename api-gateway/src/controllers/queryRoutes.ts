import axios from "axios";
import { Request, Response } from "express";
export const askQuestion = async (req: Request, res: Response) => {
  try {
    const { question, doc_id } = req.body;

    if (!question || !doc_id) {
      return res.status(400).json({ message: "Something missing " });
    }

    // call python sevice

    const Pythonresponse = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/query`,
      {
        question,
        doc_id,
      },
    );

    return res.json(Pythonresponse.data);
  } catch (error:any) {
    return res.status(500).json({
      message: "Error querying AI service",
      error: error?.response?.data || error.message,
    });
  }
};
