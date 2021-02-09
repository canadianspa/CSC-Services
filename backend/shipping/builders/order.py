def build_order(row):
    return {
        "id": row[0],
        "destination_address": {
            "first_name": row[41],
            "last_name": row[42],
            "company": "",
            "line_1": row[44],
            "line_2": "",
            "city": row[46],
            "state": "",
            "zip": row[49],
            "country": "GB",
            "phone": row[28],
            "email": row[27],
        },
        "reference": row[1],
    }


"""
    PARCEL
    {
        "dimensions": {
            "height": 15,
            "width": 22,
            "length": 10,
            "unit": "cm"
        },
        "weight_in_grams": 4000
    },
"""