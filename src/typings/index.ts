namespace Express {
    interface Request {
        salesman: {
            username: string;
            salesman_id: string;
        }
    }
}

export interface IQueryParams {
    table_id: number;
    item_id: number;
    query: "increase" | "decrease";
}

export interface IJwtPayload {
    salesman_id: string,
    username: string
}

export interface ITable {
    id: number;
    cart_table_id: string;
    cart_table_name: string;
    Cart: ICart;
}

export interface ICart {
    id?: number;
    cart_table_id?: number;
    customer_first_name?: string;
    customer_last_name?: string;
    customer_mobile?: string;
    Cart_items: ICartItem[];
    total_price: number;
    payment_status: string;
    payment_method: string;
}

export interface ICartItem {
    id?: number;
    cart_id?: number;
    itemmaster_id: number;
    quantity: number;
    name?: string
    product_price: number;
}

export interface IOrder {
    shop_code: string
    customer_first_name: string
    customer_last_name: string
    customer_email: string
    customer_mobile: string
    order_price?: string
    payment_method: string
    payment_status: string
    order_items: ICartItem[]
}