

import chromadb


# create persistent client

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(name="pdf_chunk")



def store_embeddings(chunks:list, embeddings, doc_id:str):
    collection.add(
        embeddings=embeddings.tolist(),
        documents=chunks,
        ids=[f"{doc_id}_{i}" for i in range(len(chunks))],
        metadatas=[{"doc_id": doc_id} for _ in chunks]
    )


def query_embeddings(query_embedding, doc_id: str, top_k: int = 3):
    """
    Retrieve top relevant chunks based on query
    """
    result = collection.query(
        query_embeddings=query_embedding.tolist(),
        n_results=top_k,
        where={"doc_id":doc_id} 
    )

    if not result["documents"] or not result["documents"][0]:
        return[]
    
    return result["documents"][0]