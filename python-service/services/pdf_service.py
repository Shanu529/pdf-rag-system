

import fitz


def extract_text_from_pdf(file_path:str):
        
        text = ""

        try:
            doc = fitz.open(file_path)
            for page in doc:
                page_text = page.get_text()

                text = text+page_text
            doc.close()
            return text
        except Exception as e:
            
            raise Exception(f"Error Reading PDF:{str(e)}")