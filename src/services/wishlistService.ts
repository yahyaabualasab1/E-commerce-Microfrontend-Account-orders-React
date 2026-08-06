import type { WishlistProduct } from '@features/wishlist/types/wishlist';
import { mockWishlist } from '@mocks/wishlist';
import { cloneMock, rejectMock, resolveMock } from '@services/mockApi';
import { loadFromStorage, saveToStorage } from '@utils/storage';

const wishlistStorageKey = 'account-orders.wishlist.v2';

function isLocalAssetUrl(value: string) {
  return value.length > 0 && !value.startsWith('http') && !value.startsWith('data:');
}

function isWishlistProduct(value: unknown): value is WishlistProduct {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const product = value as Partial<WishlistProduct>;

  return (
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.brand === 'string' &&
    typeof product.image === 'string' &&
    isLocalAssetUrl(product.image) &&
    Array.isArray(product.images) &&
    product.images.every((image) => typeof image === 'string' && isLocalAssetUrl(image)) &&
    typeof product.price === 'number' &&
    typeof product.rating === 'number' &&
    typeof product.dateAdded === 'string'
  );
}

function loadWishlist() {
  const storedWishlist = loadFromStorage<unknown>(wishlistStorageKey, null);

  if (Array.isArray(storedWishlist) && storedWishlist.every(isWishlistProduct)) {
    return storedWishlist;
  }

  const nextWishlist = cloneMock(mockWishlist);
  saveToStorage(wishlistStorageKey, nextWishlist);
  return nextWishlist;
}

let wishlist: WishlistProduct[] = loadWishlist();

function persistWishlist(nextWishlist: WishlistProduct[]) {
  wishlist = nextWishlist;
  saveToStorage(wishlistStorageKey, wishlist);
}

export const wishlistService = {
  async getWishlist(): Promise<WishlistProduct[]> {
    wishlist = loadWishlist();
    return resolveMock(wishlist);
  },

  async removeWishlistItem(productId: string): Promise<WishlistProduct[]> {
    if (!wishlist.some((product) => product.id === productId)) {
      return rejectMock(new Error('Wishlist item was not found.'));
    }

    persistWishlist(wishlist.filter((product) => product.id !== productId));
    return resolveMock(wishlist);
  },

  async restoreWishlist(): Promise<WishlistProduct[]> {
    persistWishlist(cloneMock(mockWishlist));
    return resolveMock(wishlist);
  },

  async clearWishlist(): Promise<WishlistProduct[]> {
    persistWishlist([]);
    return resolveMock(wishlist);
  },
};
