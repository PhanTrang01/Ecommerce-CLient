import { Timestamp } from "firebase/firestore";

export type User = {
  id: number;
  name: string;
  email: string;
  photoURL: string;
};

export type Conversation = {
  users: string[];
};

export type UserInConversation = {
  email: string;
  lastSeen: Timestamp;
  photoURL: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sent_at: string;
  text: string;
  user: string;
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

export enum ECartStatus {
  PENDING,
  ORDER,
  PURCHASED,
}

export enum ESelect {
  NOT_SELECTED,
  SELECTED,
}

type CartProduct = {
  id: number;
  pname: string;
  description: string;
  price: number;
  quantity: number;
  photoURL: string;
};

export type Cart = {
  id: number;
  quantity: number;
  status: ECartStatus;
  select: ESelect;
  product: CartProduct;
  createdAt: Date;
};
