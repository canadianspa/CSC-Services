from common.config import ( 
    BANDQ_CHANNEL_ID, 
    RANGE_CHANNEL_ID, 
    HOMEBASE_CHANNEL_ID, 
    WAYFAIR_CHANNEL_ID, 
    JTF_CHANNEL_ID, 
    TRAVISPERKINS_CHANNEL_ID
)

from common.config import ( 
    BANDQ_SPREADSHEET_ID, 
    RANGE_SPREADSHEET_ID, 
    HOMEBASE_SPREADSHEET_ID, 
    WAYFAIR_SPREADSHEET_ID, 
    JTF_SPREADSHEET_ID, 
    TRAVISPERKINS_SPREADSHEET_ID
)

from common.config import ( 
    BANDQ_SPREADSHEET_NAME, 
    RANGE_SPREADSHEET_NAME, 
    HOMEBASE_SPREADSHEET_NAME, 
    WAYFAIR_SPREADSHEET_NAME, 
    JTF_SPREADSHEET_NAME, 
    TRAVISPERKINS_SPREADSHEET_NAME
)

from common.config import ( 
    BANDQ_ORDER_NO_COLUMN,
    RANGE_ORDER_NO_COLUMN,
    WAYFAIR_ORDER_NO_COLUMN,
    HOMEBASE_ORDER_NO_COLUMN,
    JTF_ORDER_NO_COLUMN,
    TRAVISPERKINS_ORDER_NO_COLUMN,
)

from .vendor_details import VendorDetails

class VendorDetailsFactory:
    def build(self, vendor):
        if vendor == "bandq":
            return VendorDetails(
                BANDQ_CHANNEL_ID, 
                BANDQ_SPREADSHEET_ID, 
                BANDQ_SPREADSHEET_NAME,
                BANDQ_ORDER_NO_COLUMN,
            )
        elif vendor == "range":
            return VendorDetails(
                RANGE_CHANNEL_ID, 
                RANGE_SPREADSHEET_ID, 
                RANGE_SPREADSHEET_NAME,
                RANGE_ORDER_NO_COLUMN
            )
        elif vendor == "homebase":
            return VendorDetails(
                HOMEBASE_CHANNEL_ID, 
                HOMEBASE_SPREADSHEET_ID, 
                HOMEBASE_SPREADSHEET_NAME,
                HOMEBASE_ORDER_NO_COLUMN
            )
        elif vendor == "wayfair":
            return VendorDetails(
                WAYFAIR_CHANNEL_ID, 
                WAYFAIR_SPREADSHEET_ID, 
                WAYFAIR_SPREADSHEET_NAME,
                WAYFAIR_ORDER_NO_COLUMN
            )
        elif vendor == "jtf":
            return VendorDetails(
                JTF_CHANNEL_ID, 
                JTF_SPREADSHEET_ID, 
                JTF_SPREADSHEET_NAME,
                JTF_ORDER_NO_COLUMN
            )
        elif vendor == "travisperkins":
            return VendorDetails(
                TRAVISPERKINS_CHANNEL_ID, 
                TRAVISPERKINS_SPREADSHEET_ID, 
                TRAVISPERKINS_SPREADSHEET_NAME,
                TRAVISPERKINS_ORDER_NO_COLUMN
            )
        else:
            raise ValueError(vendor)

