from .classes.channel_details_factory import ChannelDetailsFactory
from .api.veeqo import get_orders


def handle_update_request(vendor):
    orders = get_orders()

    channel_details = ChannelDetailsFactory().build(vendor)
    print(channel_details)
    orders_for_channel = []
    for order in orders:
        if order['channel']['id'] == channel_details.channel_id:
            orders_for_channel.append(order)
            

    return []
