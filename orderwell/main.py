from common.api.google_service import GoogleService
from common.config import BANDQ_SPREADSHEET_ID, BANDQ_SPREADSHEET_NAME, VEEQO_APP_ORDERS_URL

def handle_orderwell_request():
    google_service = GoogleService()
    
    range_str = f"{BANDQ_SPREADSHEET_NAME}!C100:O"
    values = google_service.get_values(BANDQ_SPREADSHEET_ID, range_str)

    orders = []
    for order in values:
        try:
            price = float(order[0].replace(",", ""))
            delivery_date = order[4]
            
            if price > 500 and not delivery_date:
                order_obj = {}
                
                order_obj['date'] = order[6]
                order_obj['id'] = order[1]
                order_obj['url'] = f"{VEEQO_APP_ORDERS_URL}/{order[1][3:]}"
                order_obj['items'] = []
                order_obj['price'] = f"{price:.2f}"

                if order[8]:
                    order_obj['items'].append(order[8])
                if order[9]:
                    order_obj['items'].append(order[9])
                if order[10]:
                    order_obj['items'].append(order[10])

                orders.append(order_obj)
        except: 
            pass
    
    return orders[::-1]
