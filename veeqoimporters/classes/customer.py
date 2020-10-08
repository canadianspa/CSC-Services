class Customer:
    def __init__(
        self, first_name, last_name, address1, address2, city, county, postcode, country, phone, email
    ):
        if first_name == "" or address1 == "" or postcode == "" or phone == "" or email == "":
            raise Exception("Incomplete Customer fields.")

        self.first_name = first_name
        self.last_name = last_name
        self.address1 = address1
        self.address2 = address2
        self.city = city
        self.county = county
        self.postcode = postcode
        self.country = country
        self.phone = phone
        self.email = email

    # For rich comparisons between 2 customer classes
    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def convert_customer_to_json(self):
        return {
            "id": "",
            "first_name": self.first_name,
            "last_name": self.last_name,
            "company": "",
            "address1": self.address1,
            "address2": self.address2,
            "city": self.city,
            "state": self.county,
            "zip": self.postcode,
            "country": self.country,
            "phone": self.phone,
            "email": self.email,
        }
