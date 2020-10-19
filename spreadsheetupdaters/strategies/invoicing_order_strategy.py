from ..vendors.bandq import format_bandq_order
from ..vendors.homebase import format_homebase_order
from ..vendors.range import format_range_order
from ..vendors.wayfair import format_wayfair_order
from ..vendors.jtf import format_jtf_order
from ..vendors.travisperkins import format_travisperkins_order
 
def invoicing_order_strategy(vendor, order):
    if vendor == "bandq":
        return format_bandq_order(order)
    elif vendor == "homebase":
        return format_homebase_order(order)
    elif vendor == "range":
        return format_range_order(order)
    elif vendor == "wayfair":
        return format_wayfair_order(order)
    elif vendor == "jtf":
        return format_jtf_order(order)
    elif vendor == "travisperkins":
        return format_travisperkins_order(order)
    else:
        raise ValueError(vendor)
