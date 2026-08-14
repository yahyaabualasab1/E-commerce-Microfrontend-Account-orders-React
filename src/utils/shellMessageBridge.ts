import type { WishlistProduct } from '@features/wishlist/types/wishlist';
import { wishlistService } from '@services/wishlistService';

type CatalogProduct = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  rating?: number;
};

type ShellMessage = {
  source?: string;
  type?: string;
  detail?: {
    action?: 'add' | 'remove';
    product?: CatalogProduct;
  };
};

function mapCategory(category?: string): WishlistProduct['category'] {
  if (category === 'Car Accessories') {
    return 'Accessories';
  }

  return 'Engine';
}

function toWishlistProduct(product: CatalogProduct): WishlistProduct {
  const productId = String(product.id);

  return {
    id: productId,
    name: product.name,
    brand: 'AutoParts',
    category: mapCategory(product.category),
    description: product.description || 'Car part from the AutoParts catalog.',
    image: product.image,
    images: [product.image],
    price: Number(product.price),
    rating: Number(product.rating) || 0,
    reviewCount: 0,
    colors: ['Standard'],
    sizes: ['Standard'],
    inStock: true,
    stockQuantity: 1,
    dateAdded: new Date().toISOString(),
    sku: `CAT-${productId}`,
  };
}

function isCatalogProduct(value: unknown): value is CatalogProduct {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const product = value as Partial<CatalogProduct>;

  return (
    (typeof product.id === 'string' || typeof product.id === 'number') &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.image === 'string'
  );
}

function sendWishlistStateToShell() {
  if (window.parent === window) {
    return;
  }

  void wishlistService
    .getWishlist()
    .then((products) => {
      window.parent.postMessage(
        {
          source: 'account',
          type: 'account:wishlist-state',
          detail: {
            productIds: products.map((product) => product.id),
          },
        },
        '*',
      );
    })
    .catch(() => undefined);
}

export function startShellMessageBridge() {
  const handleMessage = (event: MessageEvent<unknown>) => {
    const message = event.data as ShellMessage;

    if (message?.source !== 'shell') {
      return;
    }

    if (message.type === 'shell:request-wishlist-state') {
      sendWishlistStateToShell();
      return;
    }

    if (
      message.type !== 'shell:toggle-wishlist' ||
      !message.detail ||
      !isCatalogProduct(message.detail.product)
    ) {
      return;
    }

    const product = toWishlistProduct(message.detail.product);

    if (message.detail.action === 'remove') {
      void wishlistService
        .removeWishlistItem(product.id)
        .then(() => window.dispatchEvent(new CustomEvent('account:wishlist-updated')))
        .catch(() => undefined);

      return;
    }

    void wishlistService
      .addWishlistItem(product)
      .then(() => window.dispatchEvent(new CustomEvent('account:wishlist-updated')))
      .catch(() => undefined);
  };

  window.addEventListener('message', handleMessage);

  return () => {
    window.removeEventListener('message', handleMessage);
  };
}