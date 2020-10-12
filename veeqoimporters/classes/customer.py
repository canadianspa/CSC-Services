class Customer:
    def __init__(
        self, first_name, last_name, address1, address2, city, state, zip_code, country, phone, email
    ):
        if first_name == "" or address1 == "" or zip_code == "" or phone == "" or email == "":
            raise Exception("Incomplete Customer fields.")

        self.id = ""
        self.first_name = first_name
        self.last_name = last_name
        self.company = ""
        self.address1 = address1
        self.address2 = address2
        self.city = city
        self.state = state
        self.zip = zip_code
        self.country = country
        self.phone = phone
        self.email = email

    # For rich comparisons between 2 customer classes
    def __eq__(self, other):
        return self.__dict__ == other.__dict__
