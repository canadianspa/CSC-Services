
def build_shipping_request(order, shipment):
    deliver_to = order["deliver_to"]

    return {
        "reference": order["number"],
        "service_code": shipment["service"],
        "destination_address": {
            "first_name": deliver_to["first_name"],
            "last_name": deliver_to["last_name"],
            "line_1": deliver_to["address1"],
            "line_2": deliver_to["address2"],
            "city": deliver_to["city"],
            "state": deliver_to["state"],
            "zip": deliver_to["zip"],
            "phone": deliver_to["phone"],
            "email": deliver_to["email"],
        },
        "parcels": format_parcels(shipment["parcels"])
    }


def format_parcels(parcels):
    formatted_parcels = []

    for parcel in parcels:
        for i in range(parcel["quantity"]):
            formatted_parcels.append({
                "dimensions": {
                    "width": parcel["width"],
                    "length": parcel["length"],
                    "height": parcel["height"],
                },
                "weight_in_grams": int(parcel["weight"]) * 1000
            })

    return formatted_parcels
