class Account:
    def __init__(
        self, 
        number, 
        access_key
    ):
        if number == "":
            raise ValueError(f"Number: {number}")
        if access_key == "":
            raise ValueError(f"Access key: {access_key}")
        
        self.number = number
        self.access_key = access_key
