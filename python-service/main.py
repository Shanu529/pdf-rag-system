

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

@app.post("/process-pdf")
def process_pdf(data:dict):
    file_path = data.get("filePath")
    print("file received", file_path)
    if not file_path:
        return{
            "errpr", "No file path provided"
        }
    text  = ""
    doc = fitz.open(file_path)

    for page in doc:
        text += page.get_text() 
    
    doc.close()
    
    return {
        "received text" : text[:1000]  # limited
    }
