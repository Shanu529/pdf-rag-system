import axios from "axios";

export const generalQuestionService =
  async (question: string, messages:string[]) => {

    const response = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/general-query`,
      {
        question,
        messages,
      }
    );

    return response.data;
};

export const askQuestionService = async (
    question: string,
    doc_id: string
  ) => {

    const response = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/query`,
      {
        question,
        doc_id,
      }
    );

    return response.data;
};