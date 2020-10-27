import json


def handle_response(response):
    if response.status_code == 200 or response.status_code == 201 or response.status_code == 204:
        return response.json()
    else:
        raise Exception(response.content)


def class_to_json(classes):
    json_string = json.dumps(classes, default=lambda o: o.__dict__)

    return json.loads(json_string)


# FOR CHECKING PROPERTIES IN CLASS
# attrs = vars(class)
# print(', '.join("%s: %s" % item for item in attrs.items()))
