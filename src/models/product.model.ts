export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    imageUrl: string;
    isNew: boolean;
    discount?: number; 
  }