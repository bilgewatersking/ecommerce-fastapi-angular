export class Order {
    totalPrice: number;
    orderItem: OrderItem[]
}

export class OrderItem{
    id: string;
    quantity: number;
}
