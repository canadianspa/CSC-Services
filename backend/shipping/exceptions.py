
class ShipmentNotCreatedError(Exception):
    """Bad response when creating shipment"""
    def __init__(self, number):
        message = f"Could not create shipment for : {number}"
        super().__init__(message)