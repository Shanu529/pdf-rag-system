import os
from fastapi import FastAPI
import uuid
from dotenv import load_dotenv

# import services 
from services.pdf_service import extract_text_from_pdf
from services.embedding_service import chunk_text, generate_embeddings
from services.chroma_service import store_embeddings, query_embeddings
from services.llm_service import generate_answer
from services.embedding_service import rerank_chunks
from services.llm_service import general_answer

load_dotenv()

app = FastAPI()

# Endpoint: Process PDF -> store embeddings
@app.post("/process-pdf")
def process_pdf(data: dict):

    file_path = data.get("filePath")

    # validate input
    if not file_path:
        return {"error": "No file path provided"}

    try:
        #  extract text from PDF
        text = extract_text_from_pdf(file_path)

        text = text.replace("\n"," ").strip()
        #  split text into chunks
        chunks = chunk_text(text)

        #  generate embeddings for chunks
        embeddings = generate_embeddings(chunks)

        #  create unique document ID
        doc_id = str(uuid.uuid4())

        #  store embeddings in vector DB
        store_embeddings(chunks, embeddings, doc_id)

        return {
            "message": "PDF processed successfully",
            "total_chunks": len(chunks),
            "doc_id": doc_id
        }

    except Exception as e:
        return {"error": str(e)}


#  Endpoint: Query PDF → retrieve + generate answer
@app.post("/query")
def query(data: dict):

    question = data.get("question")
    selected_doc_id = data.get("doc_id")

    # validate inputs
    if not question:
        return {"error": "No question provided"}

    if not selected_doc_id:
        return {"error": "No document ID provided"}

    try:
        #  convert question to embedding
        query_vector = generate_embeddings([question])

        #  retrieve relevant chunks from DB
        results = query_embeddings(query_vector, selected_doc_id)


        if not results:
            return {"answer": "No relevant data found"}

        
        results = rerank_chunks(results, question)

        # combine chunks into context
        context = "\n\n".join(results[:3])

        # generate answer using LLM
        answer = generate_answer(question, context)

        return {"answer": answer,"sources": results[:3]}

    except Exception as e:
        return {"error": str(e)}



@app.post("/general-query")
def general_query(data:dict):
    question  = data.get("question")
    messages = data.get("messages",[])

    if not question:
        return {"error": "No Question provided"}
    
    answer = general_answer(question, messages)
    return {"Answer": answer}