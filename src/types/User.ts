
export type User = {
    _id?: string;
    user_name: string;
    user_email: string;
    user_auth: number;
    user_password: string;
    user_phone: string;
    user_address: string;
    user_status: boolean;
    create_at: string;
    shopping_cart: ShoppingCart[];
    user_order: Order[];
}

export type ShoppingCart = {
    sid: string;
    product_img: string;
    product_name: string;
    product_color: string;
    product_size: string;
    product_quantity: number;
    product_discount: number;
    product_price: number;
}

type Order = {
    order_id: string;
    order_status: string;
    shopping_cart: ShoppingCart[];
    userName: string;
    userEmail: string;
    userAddress: string;
    userPhone: number;
    deliveryMethod: string;
    payMethod: string;
    remark?: string;
    invoice?: {
        type: string;
        number: number;
    };
};

