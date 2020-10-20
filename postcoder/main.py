from .api.postcoder import check_postcode


def handle_postcoder_request(query):
    return check_postcode(query)