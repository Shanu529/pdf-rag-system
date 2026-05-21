


from sentence_transformers import SentenceTransformer

# load model once (global)
model = SentenceTransformer("all-MiniLM-L6-v2")

def chunk_text(text, chunk_size=500, overlap=50):
    chunks =[]
    start = 0
    while start < len(text):
        end = start + chunk_size

        chunk = text[start:end]
        if "." in chunk:
            last_period = chunk.rfind(".")
            chunk = chunk[:last_period+1]

        chunks.append(chunk.strip())
        start = start + chunk_size - overlap
    return chunks



def generate_embeddings(chunks:list):
    embedding = model.encode(chunks , batch_size=32)
    return embedding


def  rerank_chunks(chunks, question):
    """
    Reorder chunks based on relevance to question
    """

    scored=[]

    for chunk in chunks:
        score = chunk.lower().count((question).lower())
        scored.append((score, chunk))
    
    scored.sort(reverse=True,key=lambda x:x[0])

    return [chunk for _, chunk in scored]
