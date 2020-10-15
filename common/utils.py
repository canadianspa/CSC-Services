def handle_response(response):
    if response.status_code == 200 or response.status_code == 201 or response.status_code == 204:
        json = response.json()
        return json
    else:
        raise Exception(response.content)
