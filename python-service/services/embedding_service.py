


from sentence_transformers import SentenceTransformer

# load model once (global)
model = SentenceTransformer("all-MiniLM-L6-v2")

def chunk_text(text, chunk_size=500, overlap=50):
    chunks =[]
    start = 0
    while start < len(text):
        end = start + chunk_size

        chunk = text[start:end]
        chunks.append(chunk)
        start = start + chunk_size - overlap
    return chunks



def generate_embeddings(chunks:list):
    embedding = model.encode(chunks , batch_size=32)
    return embedding