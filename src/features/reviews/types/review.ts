export interface ProductReview {
  id: string;
  productId: string;
  orderId: string;
  productName: string;
  productBrand: string;
  productCategory: string;
  productImage: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  reviewImages: string[];
}
