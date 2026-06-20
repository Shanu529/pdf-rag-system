

import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()



clientGrok = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_answer(question, context):
    prompt = f"""
    You are a helpful AI assistant.

    Use the provided context to answer the question.

    If the user asks for:
    - summary
    - explain this pdf
    - what is this document about
    - overview

    Then summarize the context clearly.

    Only say:
    "I don't know based on the document."

    If the exact answer is not found, try to infer from the provided context.
    Only say "I don't know based on the document" if absolutely no relevant information exists.


    Context:
    {context}

    question:
    {question}

    """

    response = clientGrok.chat.completions.create(
        model="Llama-3.3-70B-Versatile",
        messages=[
            {"role" : "system" ,"content":"You are a helpful assistant that answers only from given context."},
            {"role": "user","content":prompt}
        ]
    )

    return response.choices[0].message.content


    
def general_answer(question, messages):

    response = clientGrok.chat.completions.create(
        model="Llama-3.3-70B-Versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful AI assistant."
            },
            *messages,
            {
                "role": "user",
                "content": question
            }
        ]
    )

    return response.choices[0].message.content


def generate_summary(text):
    prompt = f"""
    You are a helpful AI assistant.
    Summarize the following text in a clear and concise manner.
    Summarize this document in 5-8 lines.

    Document:
    {text[:5000]}
    """
    response = clientGrok.chat.completions.create(
        model="Llama-3.3-70B-Versatile",
        messages=[
            {"role":"system",
             "content":"You are a document summarization assistant."
            },
            {
                "role":"user",
                "content":prompt
            }
        ]
    )
    return response.choices[0].message.content
