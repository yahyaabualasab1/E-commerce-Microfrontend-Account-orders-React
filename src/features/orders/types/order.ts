export type OrderStatus = 'Delivered' | 'In transit' | 'Processing' | 'Returned';

export interface PurchasedProduct {
  id: string;
  name: string;
  brand: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: OrderStatus;
  totalPrice: number;
  shippingAddress: string;
  paymentMethod: string;
  products: PurchasedProduct[];
}
