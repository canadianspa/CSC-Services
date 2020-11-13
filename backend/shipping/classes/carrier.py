class Carrier:
    def __init__(
        self, 
        name, 
        title, 
        accounts = None,
    ):
        if name == "":
            raise ValueError(f"Name: {name}")
        if title == "":
            raise ValueError(f"Title: {title}")
        if accounts is not None:
            if not isinstance(accounts, list) or len(accounts) == 0:
                raise ValueError(f"Accounts: ", accounts)
        
        self.name = name
        self.title = title
        self.accounts = accounts
