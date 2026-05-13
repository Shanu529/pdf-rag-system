import axios from "axios";
import { Request, Response } from "express";
export const generalQues = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "No question provided " });
    }

    // call llm python
    const generalQuestionResponse = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/general-query`,
      { question },
    );

    return res.status(200).json(generalQuestionResponse.data);
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong with general question",
      error: error?.response?.data || error.message,
    });
  }
};
