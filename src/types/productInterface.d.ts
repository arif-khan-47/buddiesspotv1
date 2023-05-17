export interface Product {
  category?: string;
  createdAt: string;
  description?: string;
  images: [
    {
      public_id: string;
      url: string;
      _id: string;
    }
  ];
  name: string;
  numberOfReview: number;
  price: number;
  ratings: number;
  review: [];
  slug: string;
  stock: number;
  _id: number;
}
