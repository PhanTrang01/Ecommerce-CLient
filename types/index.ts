export type User = {
  name: string;
  email: string;
  photoURL: string;
};

type ProductCategory = {
  id: number;
  name: string;
};

type ProductOwner = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  pname: string;
  description: string;
  price: number;
  quantity: number;
  photoURL: string;
  category: ProductCategory;
  owner: ProductOwner;
};
