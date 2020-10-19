import re

def format_wayfair_order(order):
    if order['status'] == 'cancelled':
        return None
    else:
        # convert to spreadsheet items format
        items = ['','']
        i = 0
        for sellable in order['line_items']:
            if i > 1:
                # Append items in orders of more than 3 products to items[2]
                items[1] = items[1] + ' & ' + sellable['sellable']['product_title'].upper()
                i+=1
            else:
                items[i] = sellable['sellable']['product_title'].upper()
                i+=1             
            
        customer_info = order['deliver_to']
        order_date = re.findall(r'\d+', str(order['created_at']))

        po_num = ''
        note_strings = str(order['customer_note']['text']).split(' ',1)
        if len(note_strings) > 0:
            po_num = note_strings[0]

        return [
            po_num,
            order['number'],
            order_date[2]+'/'+order_date[1]+'/'+order_date[0],
            '',
            '',
            customer_info['first_name'].upper(),
            customer_info['last_name'].upper(),
            customer_info['address1'].upper(),
            customer_info['zip'].upper(),
            '',
            items[0],
            items[1],
            order['total_price']
        ]
                