from base64 import b64encode, b64decode
from PyPDF2 import PdfFileMerger

from common.config import TEMP_FOLDER_PATH

label_folder = f"{TEMP_FOLDER_PATH}\\labels"
label = f"{TEMP_FOLDER_PATH}\\label.pdf"


def encode_pdf(binary):
    encoded = b64encode(binary)

    return encoded.decode("utf-8")


def decode_pdf(string):
    decoded = b64decode(string)

    html = str.encode("<!DOCTYPE html>")

    if html in decoded:
        decoded = decoded.split(html)[0]

    return decoded


def save_pdf(filepath, binary):
    temp = open(filepath, 'wb')
    temp.write(binary)
    temp.close()


def open_pdf(filepath):
    temp = open(filepath, 'rb')
    return temp.read()


def save_pdfs(strings):
    files = []

    for index, string in enumerate(strings):
        binary = decode_pdf(string)

        filename = "templabel" + str(index) + ".pdf"
        filepath = label_folder + "\\" + filename

        save_pdf(filepath, binary)

        files.append(filepath)

    return files


def merge_pdfs(files):
    merger = PdfFileMerger()

    for pdf in files:
        merger.append(pdf)

    merger.write(label)
    merger.close()  

    pdf = open_pdf(label)
    b64pdf = encode_pdf(pdf)

    return b64pdf