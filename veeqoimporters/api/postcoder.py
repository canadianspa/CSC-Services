import requests
from requests.utils import quote

from common.config import POSTCODER_URL
from common.credentials.apikeys import POSTCODER_APIKEY

from common.utils import handle_response


def check_postcode(postcode):
    # URI Encoded search term
    search_term = quote(postcode, safe="")

    url = f"{POSTCODER_URL}/pcw/{POSTCODER_APIKEY}/address/uk/{search_term}"

    response = requests.get(url)
    response_json = handle_response(response)

    return response_json
