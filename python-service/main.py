

from fastapi import FastAPI
import fitz
app = FastAPI()

@app.post("/test-python")
def test(data:dict):
    text = data.get("text", "")
    return {
        "received" : text,
        "length of text" :len(text)
    }



#  chunkign function
def chunk_text(text , chunk_size =500, overlap=50):
    chunks =[]
    start = 0
    while start < len(text):
        end = start + chunk_size

        chunk = text[start:end]
        chunks.append(chunk)
        start = start + chunk_size - overlap
    return chunks




# Endpoint to process pdf chunking
@app.post("/process-pdf")
def process_pdf(data:dict):

    file_path = data.get("filePath")
    print("file received", file_path)
    if not file_path:
        return{
            "error": "No file path provided"
        }
    
    text  = ""
    try:

        doc = fitz.open(file_path)
        for page in doc:
            page_text = page.get_text()

            text = text+page_text

        doc.close()
        print("total length of text" ,len(text))
        chunk = chunk_text(text)
        return{
            "total chunk" : len(chunk),
            "simple chunk" : chunk[:3]
        }

    except Exception as e:
        return {"Error": str(e)}

