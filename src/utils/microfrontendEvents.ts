import type { WishlistProduct } from '@features/wishlist/types/wishlist';

export type AccountEventMap = {
  'account:wishlist-move-to-cart': {
    productId: string;
    productName: string;
    price: number;
    quantity: 1;
    source: 'account-orders';
  };
  'account:wishlist-item-removed': {
    productId: string;
    source: 'account-orders';
  };
  'account:wishlist-cleared': {
    productIds: string[];
    source: 'account-orders';
  };
  'account:profile-updated': {
    userId: string;
    fullName: string;
    email: string;
    avatar: string | null;
    source: 'account-orders';
  };
  'account:profile-image-updated': {
    userId: string;
    avatar: string | null;
    source: 'account-orders';
  };
};

export function dispatchAccountEvent<TEventName extends keyof AccountEventMap>(
  eventName: TEventName,
  detail: AccountEventMap[TEventName],
) {
  window.dispatchEvent(
    new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail,
    }),
  );
}

export function dispatchWishlistMoveToCart(product: WishlistProduct) {
  dispatchAccountEvent('account:wishlist-move-to-cart', {
    productId: product.id,
    productName: product.name,
    price: product.price,
    quantity: 1,
    source: 'account-orders',
  });
}
