import { User } from "./user";

export interface Product {
  _id?: string;
  imgs?: string [];
  description?: string;
  price?: string;
  stock?: string;
  usuario?: User;
  createdOn?: string;
}

