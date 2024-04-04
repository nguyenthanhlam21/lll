export interface TProduct {
  id?: number | string;
  title: string;
  price: number;
  thumbnail?: string;
  images?: string[];
  description?: string;
}
