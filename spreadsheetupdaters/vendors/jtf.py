import re

def format_jtf_order(order):
    if order['status'] == 'cancelled':
        return None
    else:
        # convert to spreadsheet items format
        items = ['','','']
        i = 0
        for sellable in order['line_items']:
            if i > 2:
                # Append items in orders of more than 3 products to items[2]
                items[2] = items[2] + ' & ' + sellable['sellable']['product_title'].upper()
                i+=1       
            else:
                items[i] = sellable['sellable']['product_title'].upper()
                i+=1            
            
        customer_info = order['deliver_to']
        order_date = re.findall(r'\d+', str(order['created_at']))

        po_num = ''
        note_nums = re.findall(r'\d+', str(order['customer_note']['text']))
        if note_nums:
            for num in note_nums:
                if len(num) == 7:
                    po_num = num
               
        customer_info = order['deliver_to']
        order_date = re.findall(r'\d+', str(order['created_at']))

        return [
            '',
            '',
            order['total_price'],
            order['number'],
            po_num,
            '',
            '',
            '',
            order_date[2]+'/'+order_date[1]+'/'+order_date[0],
            '',
            items[0],
            items[1],
            items[2],
            customer_info['first_name'].upper(),
            customer_info['last_name'].upper(),
            customer_info['zip'].upper(),
            customer_info['address1'].upper(),
            order['subtotal_price']
        ]
                