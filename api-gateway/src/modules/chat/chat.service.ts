import axios from "axios";

export const generalQuestionService =
  async (question: string) => {

    const response = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/general-query`,
      {
        question,
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