from .carrier import Carrier
from .account import Account

from ..config import (
    XDP_A,
    XDP_B,
    XDP_C,
    XDP_A_KEY,
    XDP_B_KEY,
    XDP_C_KEY,
)


def CarrierFactory(carrier):
    if carrier == "xdp":
        accounts = [
            Account(XDP_A, XDP_A_KEY),
            Account(XDP_B, XDP_B_KEY),
            Account(XDP_C, XDP_C_KEY)
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
