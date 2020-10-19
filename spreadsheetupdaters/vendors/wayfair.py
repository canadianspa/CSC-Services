import re

def format_wayfair_order(order):
    customer_info = order['deliver_to']

    if (order['status'] == 'cancelled' or 
        customer_info['first_name'] == 'B & Q plc' or 
        customer_info['first_name'] == 'B&Q plc'):
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
            
        order_date = re.findall('\d+', str(order['created_at']))

        order_nums = ['','']
        note_nums = re.findall('\d+', str(order['customer_note']['text']))
        if note_nums:
            for num in note_nums:
                if len(num) == 9:
                    order_nums[0] = num                    
                elif len(num) == 4:
                    order_nums[1] = num
                    

        return ['',
            '',
            order['total_price'],
            order['number'],
            order_nums[0],
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
            order_nums[1],
            order['subtotal_price']
        ]
                