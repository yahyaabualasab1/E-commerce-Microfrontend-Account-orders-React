import type { Order } from '@features/orders/types/order';
import { mockOrders } from '@mocks/orders';
import { cloneMock, resolveMock } from '@services/mockApi';

let orders: Order[] = cloneMock(mockOrders);

export const orderService = {
  async getOrders(): Promise<Order[]> {
    return resolveMock(orders);
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const order = orders.find((currentOrder) => currentOrder.id === orderId) ?? null;
    return resolveMock(order);
  },

  async resetOrders(): Promise<Order[]> {
    orders = cloneMock(mockOrders);
    return resolveMock(orders);
  },
};
