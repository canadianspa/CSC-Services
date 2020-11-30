def get_values_wrapper(google_service, vendor_details):
    # String determining which sheet & column contains order numbers
    range_str = f"{vendor_details.ss_name}!{vendor_details.ss_order_column}:{vendor_details.ss_order_column}"
    values = google_service.get_values(vendor_details.ss_id, range_str)

    return values


def append_values_wrapper(google_service, vendor_details, values, orders):
    range_str = f"{vendor_details.ss_name}!A{str(len(values) + 1)}:V"

    google_service.append_values(vendor_details.ss_id, range_str, orders)