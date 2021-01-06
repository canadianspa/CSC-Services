class Customer:
    def __init__(
        self,
        first_name,
        last_name,
        address1,
        address2=None,
        city=None,
        state=None,
        zip_code=None,
        country=None,
        phone=None,
        email=None
    ):
        if last_name == "" and first_name == "":
            raise ValueError(
                f"first_name: {first_name}, last_name: {last_name}")
        if address1 == "":
            raise ValueError(f"address1: {address1}")
        if zip_code == "":
            raise ValueError(f"zip_code: {zip_code}")
        if phone == "":
            raise ValueError(f"phone: {phone}")

        self.id = ""
        self.first_name = self._format(first_name)
        self.last_name = self._format(last_name)
        self.company = ""
        self.address1 = self._format(address1)
        self.address2 = self._format(address2)
        self.city = self._format(city)
        self.state = self._format(state)
        self.zip = zip_code
        self.country = country
        self.phone = phone
        self.email = self._format(email)

    def _format(self, string):
        if string is not None:
            return string.title().replace(";", "") or ""
        else:
            return ""

    # For rich comparisons between 2 customer classes

    def __eq__(self, other):
        return self.__dict__ == other.__dict__
