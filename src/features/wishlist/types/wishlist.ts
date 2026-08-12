export interface WishlistProduct {
  id: string;
  name: string;
  brand: string;
  category:
    | 'Brakes'
    | 'Lighting'
    | 'Exterior'
    | 'Interior'
    | 'Electronics'
    | 'Maintenance'
    | 'Engine'
    | 'Tires'
    | 'Accessories';
  description: string;
  image: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  stockQuantity: number;
  dateAdded: string;
  sku: string;
}
