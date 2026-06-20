
# Endpoint: Process PDF -> store embeddings

from fastapi import APIRouter

from services.embedding_service import (
    generate_embeddings,
    rerank_chunks
)

from services.chroma_service import (
    query_embeddings
)

from services.llm_service import (
    generate_answer,
    general_answer,
    generate_summary
)

from services.pdf_service import extract_text_from_pdf

from services.embedding_service import chunk_text

from services.chroma_service import store_embeddings

import uuid

router = APIRouter()

@router.post("/process-pdf")
def process_pdf(data: dict):

    file_path = data.get("filePath")
    folder_id = data.get("folderId")

    print("FOLDER ID in ai-service:", folder_id)

    # validate input
    if not file_path:
        return {"error": "No file path provided"}

    try:
        #  extract text from PDF
        text = extract_text_from_pdf(file_path)

        text = text.replace("\n"," ").strip()

        # call summary function to generate summary of the document
        summary = generate_summary(text)

        #  split text into chunks
        chunks = chunk_text(text)

        #  generate embeddings for chunks
        embeddings = generate_embeddings(chunks)

        #  create unique document ID
        doc_id = str(uuid.uuid4())

        #  store embeddings in vector DB
        store_embeddings(chunks, embeddings, doc_id,folder_id)

        return {
            "message": "PDF processed successfully",
            "total_chunks": len(chunks),
            "doc_id": doc_id,
            "summary": summary
        }

    except Exception as e:
        return {"error": str(e)}




#  Endpoint: Query PDF → retrieve + generate answer
@router.post("/query")
def query(data: dict):

    question = data.get("question")
    selected_doc_id = data.get("doc_id")
    folder_id = data.get("folder_id")
    print("FOLDER ID: in ai-service ", folder_id)
    # validate inputs
    if not question:
        return {"error": "No question provided"}

    if not folder_id:
        return {"error": "No document ID provided"}

    try:
        #  convert question to embedding
        query_vector = generate_embeddings([question])

        #  retrieve relevant chunks from DB
        results = query_embeddings(query_vector,  folder_id)


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



@router.post("/general-query")
def general_query(data:dict):
    question  = data.get("question")
    messages = data.get("messages",[])

    if not question:
        return {"error": "No Question provided"}
    
    print("QUESTION:", question)
    print("MESSAGES:", messages)
    print(type(messages))
    
    answer = general_answer(question, messages)
    return {"Answer": answer}