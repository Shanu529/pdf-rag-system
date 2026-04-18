

import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()



clientGrok = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_answer(question, context):
    prompt = f"""
    You are a strict AI assistant.

    Answer ONLY from the provided context.
    If the answer is not present, say:
    "I don't know based on the document."


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


    