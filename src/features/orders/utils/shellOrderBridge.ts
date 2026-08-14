import type { Order, PurchasedProduct } from '@features/orders/types/order';
import { orderService } from '@services/orderService';

type CheckoutItem = {
  id?: string | number;
  name?: string;
  brand?: string;
  price?: number | string;
  qty?: number | string;
  quantity?: number | string;
};

type CheckoutOrder = {
  id?: string | number;
  orderNumber?: string;
  orderDate?: string;
  total?: number | string;
  totalPrice?: number | string;
  shippingAddress?: string;
  paymentMethod?: string;
  items?: CheckoutItem[];
  products?: CheckoutItem[];
};

type ShellMessage = {
  source?: string;
  type?: string;
  detail?: CheckoutOrder;
};

function isCheckoutOrder(value: unknown): value is CheckoutOrder {
  return typeof value === 'object' && value !== null;
}

function mapProducts(order: CheckoutOrder): PurchasedProduct[] {
  const items = order.products ?? order.items ?? [];

  return items.map((item, index) => ({
    id: String(item.id ?? `checkout-item-${index + 1}`),
    name: item.name ?? 'Car part',
    brand: item.brand ?? 'AutoParts',
    size: 'Standard',
    color: 'Standard',
    quantity: Number(item.quantity ?? item.qty ?? 1),
    price: Number(item.price ?? 0)
  }));
}

function toAccountOrder(checkoutOrder: CheckoutOrder): Order {
  const products = mapProducts(checkoutOrder);
  const calculatedTotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const orderId = String(checkoutOrder.id ?? Date.now());

  return {
    id: `checkout-${orderId}`,
    orderNumber: checkoutOrder.orderNumber ?? `ORD-${orderId}`,
    orderDate: checkoutOrder.orderDate ?? new Date().toLocaleDateString(),
    status: 'Processing',
    totalPrice: Number(checkoutOrder.totalPrice ?? checkoutOrder.total ?? calculatedTotal),
    shippingAddress:
      checkoutOrder.shippingAddress ?? 'Shipping address confirmed during checkout',
    paymentMethod: checkoutOrder.paymentMethod ?? 'Payment confirmed',
    products
  };
}

export function startShellOrderBridge() {
  const handleMessage = (event: MessageEvent<unknown>) => {
    const message = event.data as ShellMessage;

    if (
      message?.source !== 'shell' ||
      message.type !== 'shell:order-placed' ||
      !isCheckoutOrder(message.detail)
    ) {
      return;
    }

    const order = toAccountOrder(message.detail);

    void orderService
      .addOrder(order)
      .then(() => {
        window.dispatchEvent(new CustomEvent('account:orders-updated'));
      })
      .catch(() => undefined);
  };

  window.addEventListener('message', handleMessage);

  return () => {
    window.removeEventListener('message', handleMessage);
  };
}