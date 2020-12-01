class Account:
    def __init__(
        self, 
        number, 
        access_key
    ):
        if number == "":
            raise ValueError(f"number: {number}")
        if access_key == "":
            raise ValueError(f"access_key: {access_key}")
        
        self.number = number
        self.access_key = access_key
