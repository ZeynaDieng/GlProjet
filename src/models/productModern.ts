export interface ProductModern {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    currency: string;
    imageUrl: string;
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    discount?: number;
  }