from .carrier import Carrier
from .account import Account

from ..config import (
    XDP_A,
    XDP_B,
    XDP_C,
)


def CarrierFactory(carrier):
    if carrier == "xdp":
        accounts = [
            XDP_A,
            XDP_B, 
            XDP_C, 
        ]

        return Carrier(
            carrier,
            "XDP",
            accounts,
        )
    elif carrier == "dx_freight":
        return Carrier(
            carrier,
            "DX Freight",
        )
    else:
        raise ValueError(carrier)
