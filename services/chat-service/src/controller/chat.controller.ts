import { Request, Response } from "express";
import {
  askQuestionService,
  generalQuestionService,
} from "../service/chat.service.js";

export const generalQues = async (req: Request, res: Response) => {
  try {
    const { question, messages } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "No question provided",
      });
    }
    console.log("Calling AI Service");
    console.log(question);
    console.log(messages);
    console.log("Before AI call in controller");
    const data = await generalQuestionService(question, messages);

    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: "General question failed",
      error: error.message,
    });
  }
};

export const askQuestion = async (req: Request, res: Response) => {
  console.log("ask Question BODY request=>>", req.body);
  try {
    const { question, doc_id } = req.body;

    if (!question || !doc_id) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    const data = await askQuestionService(question, doc_id);

    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: "Query failed",
      error: error.message,
    });
  }
};
