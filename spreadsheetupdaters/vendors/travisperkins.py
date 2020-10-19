import re

def format_travisperkins_order(order):
    if order['status'] == 'cancelled':
        return None
    else:
        items = ''
        for sellable in order['line_items']:
            items += sellable['sellable']['product_title'].upper()         
            
        customer_info = order['deliver_to']
        order_date = re.findall(r'\d+', str(order['created_at']))

        po_num = ''
        note_nums = re.findall(r'\d+', str(order['customer_note']['text']))
        if note_nums:
            for num in note_nums:
                if len(num) == 9:
                    po_num = num
                    
        return [
            order['total_price'],
            '',
            '',
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
            '',
            items,
            '',
            order['subtotal_price']
        ]
                