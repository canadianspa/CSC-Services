class Customer:
    def __init__(
        self, first_name, last_name, address1, address2, city, county, postcode, country
    ):
        if first_name == "" or address1 == "" or postcode == "":
            raise Exception("Incomplete Customer fields.")

        self.first_name = first_name
        self.last_name = last_name
        self.address1 = address1
        self.address2 = address2
        self.city = city
        self.county = county
        self.postcode = postcode
        self.country = country
