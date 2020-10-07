def handle_response(response):
    if(response.status_code == 200):
        json = response.json()
        return json
    else:
        raise Exception("Invalid response: " + response.content)
