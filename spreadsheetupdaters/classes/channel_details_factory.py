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

from .channel_details import ChannelDetails

class ChannelDetailsFactory:
    def build(self, vendor):
        if vendor == "bandq":
            return ChannelDetails(
                BANDQ_CHANNEL_ID, 
                BANDQ_SPREADSHEET_ID, 
                BANDQ_SPREADSHEET_NAME
            )
        elif vendor == "range":
            return ChannelDetails(
                RANGE_CHANNEL_ID, 
                RANGE_SPREADSHEET_ID, 
                RANGE_SPREADSHEET_NAME
            )
        elif vendor == "homebase":
            return ChannelDetails(
                HOMEBASE_CHANNEL_ID, 
                HOMEBASE_SPREADSHEET_ID, 
                HOMEBASE_SPREADSHEET_NAME
            )
        elif vendor == "wayfair":
            return ChannelDetails(
                WAYFAIR_CHANNEL_ID, 
                WAYFAIR_SPREADSHEET_ID, 
                WAYFAIR_SPREADSHEET_NAME
            )
        elif vendor == "jtf":
            return ChannelDetails(
                JTF_CHANNEL_ID, 
                JTF_SPREADSHEET_ID, 
                JTF_SPREADSHEET_ID
            )
        elif vendor == "travisperkins":
            return ChannelDetails(
                TRAVISPERKINS_CHANNEL_ID, 
                TRAVISPERKINS_SPREADSHEET_ID, 
                TRAVISPERKINS_SPREADSHEET_NAME
            )
        else:
            raise ValueError(vendor)

