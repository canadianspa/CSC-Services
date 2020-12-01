import json

from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator


def handle_response(response):
    if response.status_code == 200 or response.status_code == 201 or response.status_code == 204:
        return response.json()
    else:
        raise Exception(response.content)


def class_to_json(classes):
    string = json.dumps(classes, default=lambda o: o.__dict__)
    return json.loads(string)


def extract_pages(fp, password='', page_numbers=None, maxpages=0,
                  caching=True, laparams=None):
    """
        MODIFIED high_level function from pdfparser.six
        Extract and yield LTPage objects

    :param pdf_file: Either a file path or a file-like object for the PDF file
        to be worked on.
    :param password: For encrypted PDFs, the password to decrypt.
    :param page_numbers: List of zero-indexed page numbers to extract.
    :param maxpages: The maximum number of pages to parse
    :param caching: If resources should be cached
    :param laparams: An LAParams object from pdfminer.layout. If None, uses
        some default settings that often work well.
    :return:
    """
    if laparams is None:
        laparams = LAParams()

    resource_manager = PDFResourceManager(caching=caching)
    device = PDFPageAggregator(resource_manager, laparams=laparams)
    interpreter = PDFPageInterpreter(resource_manager, device)
    for page in PDFPage.get_pages(fp, page_numbers, maxpages=maxpages,
                                  password=password, caching=caching):
        interpreter.process_page(page)
        layout = device.get_result()
        return layout


def print_class_attrs(_class):
    attrs = vars(_class)
    print(', '.join("%s: %s" % item for item in attrs.items()))
