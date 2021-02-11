from io import BytesIO
from io import FileIO as file
from base64 import b64encode, b64decode
from packages.PyPDF2 import PdfFileMerger

from common.config import TEMP_FOLDER_PATH

def merge_pdfs(strings):
    merger = PdfFileMerger()

    for string in strings:
        decoded = b64decode(string)
        pdf = BytesIO(decoded)

        merger.append(pdf)

    label = f"{TEMP_FOLDER_PATH}\\label.pdf"

    # TODO: CUSTOM WRITE FUNC RETURNING B64 STRING
    merger.write(label)
    merger.close()

    fileobj = file(label, 'rb')
    b64label = b64encode(fileobj.read())

    return b64label