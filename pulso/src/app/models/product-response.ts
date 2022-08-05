import { Product } from './product';
export interface ProductResponse {

  error: boolean;
  status: number;
  body:{

    page: number;
    products: Product [];

  }

}
