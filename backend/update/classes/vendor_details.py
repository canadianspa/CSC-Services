class VendorDetails:
    def __init__(
        self,
        name,
        channel_id,
        spreadsheet_id,
        spreadsheet_name,
        spreadsheet_order_column
    ):
        self.name = name
        self.channel_id = channel_id
        self.ss_id = spreadsheet_id
        self.ss_name = spreadsheet_name
        self.ss_order_column = spreadsheet_order_column
