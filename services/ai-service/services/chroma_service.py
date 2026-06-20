

import chromadb


# create persistent client

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(name="pdf_chunk")



def store_embeddings(chunks:list, embeddings, doc_id:str,folder_id):
    collection.add(
        embeddings=embeddings.tolist(),
        documents=chunks,
        ids=[f"{doc_id}_{i}" for i in range(len(chunks))],
        metadatas=[{"doc_id": doc_id, "folder_id": folder_id} for _ in chunks]
    )


def query_embeddings(query_embedding,folder_id: str, top_k: int = 5):
    """
    Retrieve top relevant chunks based on query
    """ 
    print("SEARCHING FOLDER:", folder_id)
    result = collection.query(
        query_embeddings=query_embedding.tolist(),
        n_results=top_k,
        where={"folder_id": folder_id}
    )

    if not result["documents"] or not result["documents"][0]:
        return[]
    
    return result["documents"][0]