from common.config import (
    BANDQ_CHANNEL_ID,
    RANGE_CHANNEL_ID,
    HOMEBASE_CHANNEL_ID,
    WAYFAIR_CHANNEL_ID,
    JTF_CHANNEL_ID,
    TRAVISPERKINS_CHANNEL_ID,
    SHOP_DIRECT_CHANNEL_ID,
    HORNBACH_CHANNEL_ID,
    ROBERT_DYAS_CHANNEL_ID
)

from common.config import (
    BANDQ_SPREADSHEET_ID,
    RANGE_SPREADSHEET_ID,
    HOMEBASE_SPREADSHEET_ID,
    WAYFAIR_SPREADSHEET_ID,
    JTF_SPREADSHEET_ID,
    TRAVISPERKINS_SPREADSHEET_ID,
    SHOP_DIRECT_SPREADSHEET_ID,
    HORNBACH_SPREADSHEET_ID,
    ROBERT_DYAS_SPREADSHEET_ID
)

from common.config import (
    BANDQ_SPREADSHEET_NAME,
    RANGE_SPREADSHEET_NAME,
    HOMEBASE_SPREADSHEET_NAME,
    WAYFAIR_SPREADSHEET_NAME,
    JTF_SPREADSHEET_NAME,
    TRAVISPERKINS_SPREADSHEET_NAME,
    SHOP_DIRECT_SPREADSHEET_NAME,
    HORNBACH_SPREADSHEET_NAME,
    ROBERT_DYAS_SPREADSHEET_NAME
)

from common.config import (
    BANDQ_ORDER_NO_COLUMN,
    RANGE_ORDER_NO_COLUMN,
    WAYFAIR_ORDER_NO_COLUMN,
    HOMEBASE_ORDER_NO_COLUMN,
    JTF_ORDER_NO_COLUMN,
    TRAVISPERKINS_ORDER_NO_COLUMN,
    SHOP_DIRECT_ORDER_NO_COLUMN,
    HORNBACH_ORDER_NO_COLUMN,
    ROBERT_DYAS_ORDER_NO_COLUMN
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
        elif vendor == "shop_direct":
            return VendorDetails(
                SHOP_DIRECT_CHANNEL_ID,
                SHOP_DIRECT_SPREADSHEET_ID,
                SHOP_DIRECT_SPREADSHEET_NAME,
                SHOP_DIRECT_ORDER_NO_COLUMN
            )
        elif vendor == "hornbach":
            return VendorDetails(
                HORNBACH_CHANNEL_ID,
                HORNBACH_SPREADSHEET_ID,
                HORNBACH_SPREADSHEET_NAME,
                HORNBACH_ORDER_NO_COLUMN
            )
        elif vendor == "robert_dyas":
            return VendorDetails(
                ROBERT_DYAS_CHANNEL_ID,
                ROBERT_DYAS_SPREADSHEET_ID,
                ROBERT_DYAS_SPREADSHEET_NAME,
                ROBERT_DYAS_ORDER_NO_COLUMN
            )
        else:
            raise ValueError(vendor)
