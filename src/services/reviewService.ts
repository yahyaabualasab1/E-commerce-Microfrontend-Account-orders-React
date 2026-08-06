import type { ProductReview } from '@features/reviews/types/review';
import { mockReviews } from '@mocks/reviews';
import { cloneMock, rejectMock, resolveMock } from '@services/mockApi';
import { loadFromStorage, saveToStorage } from '@utils/storage';

const reviewsStorageKey = 'account-orders.reviews.v2';

function isLocalAssetUrl(value: string) {
  return value.length > 0 && !value.startsWith('http') && !value.startsWith('data:');
}

function isProductReview(value: unknown): value is ProductReview {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const review = value as Partial<ProductReview>;

  return (
    typeof review.id === 'string' &&
    typeof review.productId === 'string' &&
    typeof review.productName === 'string' &&
    typeof review.productBrand === 'string' &&
    typeof review.productImage === 'string' &&
    isLocalAssetUrl(review.productImage) &&
    typeof review.rating === 'number' &&
    typeof review.title === 'string' &&
    typeof review.comment === 'string' &&
    typeof review.createdAt === 'string' &&
    Array.isArray(review.reviewImages) &&
    review.reviewImages.every((image) => typeof image === 'string' && isLocalAssetUrl(image))
  );
}

function loadReviews() {
  const storedReviews = loadFromStorage<unknown>(reviewsStorageKey, null);

  if (Array.isArray(storedReviews) && storedReviews.every(isProductReview)) {
    return storedReviews;
  }

  const nextReviews = cloneMock(mockReviews);
  saveToStorage(reviewsStorageKey, nextReviews);
  return nextReviews;
}

let reviews: ProductReview[] = loadReviews();

function persistReviews(nextReviews: ProductReview[]) {
  reviews = nextReviews;
  saveToStorage(reviewsStorageKey, reviews);
}

export const reviewService = {
  async getReviews(): Promise<ProductReview[]> {
    reviews = loadReviews();
    return resolveMock(reviews);
  },

  async updateReview(updatedReview: ProductReview): Promise<ProductReview> {
    if (!reviews.some((review) => review.id === updatedReview.id)) {
      return rejectMock(new Error('Review was not found.'));
    }

    const reviewToSave = {
      ...updatedReview,
      updatedAt: new Date().toISOString(),
    };

    persistReviews(
      reviews.map((review) => (review.id === reviewToSave.id ? reviewToSave : review)),
    );
    return resolveMock(reviewToSave);
  },

  async deleteReview(reviewId: string): Promise<ProductReview[]> {
    if (!reviews.some((review) => review.id === reviewId)) {
      return rejectMock(new Error('Review was not found.'));
    }

    persistReviews(reviews.filter((review) => review.id !== reviewId));
    return resolveMock(reviews);
  },

  async restoreReviews(): Promise<ProductReview[]> {
    persistReviews(cloneMock(mockReviews));
    return resolveMock(reviews);
  },
};
