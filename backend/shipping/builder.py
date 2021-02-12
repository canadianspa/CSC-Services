def build_shipment(order, service_code, parcels):
    return {
        "destination_address": {
            "first_name": order["deliver_to"]["first_name"],
            "last_name": order["deliver_to"]["last_name"],
            "company": "",
            "city": order["deliver_to"]["city"],
            "country": "GB",
            "state": "",
            "zip": order["deliver_to"]["zip"],
            "phone": order["deliver_to"]["phone"],
            "email": order["deliver_to"]["email"],
            "line_1": order["deliver_to"]["address1"],
            "line_2": order["deliver_to"]["address2"]
        },
        "parcels": parcels,
        "reference": order["number"],
        "service_code": service_code,
    }