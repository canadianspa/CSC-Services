from ..vendors.bandq import format_bandq_order
from ..vendors.homebase import format_homebase_order
from ..vendors.range import format_range_order
from ..vendors.wayfair import format_wayfair_order
from ..vendors.jtf import format_jtf_order
from ..vendors.travisperkins import format_travisperkins_order
from ..vendors.shop_direct import format_shop_direct_order
from ..vendors.hornbach import format_hornbach_order
from ..vendors.robert_dyas import format_robert_dyas_order


def format_order_strategy(vendor, order):
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
    elif vendor == "shop_direct":
        return format_shop_direct_order(order)
    elif vendor == "hornbach":
        return format_hornbach_order(order)
    elif vendor == "robert_dyas":
        return format_robert_dyas_order(order)
    else:
        raise ValueError(vendor)
