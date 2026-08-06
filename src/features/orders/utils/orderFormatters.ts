import type { OrderStatus } from '@features/orders/types/order';

export function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function getOrderStatusColor(status: OrderStatus) {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'In transit':
      return 'primary';
    case 'Processing':
      return 'warning';
    case 'Returned':
      return 'default';
  }
}
