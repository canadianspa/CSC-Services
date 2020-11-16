class Customer:
    def __init__(
        self, 
        first_name, 
        last_name, 
        address1, 
        address2 = None, 
        city = None, 
        state = None, 
        zip_code = None, 
        country = None, 
        phone = None, 
        email = None
    ):
        if last_name == "" and first_name == "":
            raise ValueError(f"first_name: {first_name}, last_name: {last_name}")
        if address1 == "":
            raise ValueError(f"Address 1: {address1}")
        if zip_code == "":
            raise ValueError(f"Post/zip code: {zip_code}")
        if phone == "":
            raise ValueError(f"Phone: {phone}")
            
        self.id = ""
        self.first_name = first_name.title()
        self.last_name = last_name.title()
        self.company = ""
        self.address1 = address1.title().replace(";", "")
        self.address2 = address2.title().replace(";", "") or ""
        self.city = city.title().replace(";", "") or ""
        self.state = state.title().replace(";", "") or ""
        self.zip = zip_code
        self.country = country or ""
        self.phone = phone
        self.email = email or ""

    # For rich comparisons between 2 customer classes
    def __eq__(self, other):
        return self.__dict__ == other.__dict__
