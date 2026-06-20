import axios from "axios";

export const generalQuestionService =
  async (question: string, messages:string[]) => {

     console.log(
      "PYTHON_ENDPOINT =",
      process.env.PYTHON_ENDPOINT
    );
    console.log("Before AI call");
    const response = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/general-query`,
      {
        question,
        messages,
      }
    );
    console.log("After AI call");
    return response.data;
    
};

export const askQuestionService = async (
    question: string,
    folder_id: string
  ) => {


  console.log("PYTHON_ENDPOINT =", process.env.PYTHON_ENDPOINT);
    const response = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/query`,
      {
        question,
        folder_id,
      }
    );
    console.log("Sending response to gateway");
    return response.data;
};