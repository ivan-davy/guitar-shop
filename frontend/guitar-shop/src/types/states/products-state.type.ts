import { ProductType } from '../product.type';

export type ProductsStateType = {
  products: ProductType[];
  filters: {
    type: string[];
    strings: number[];
  };
  sorting: {
    by: string | null;
    direction: string | null;
  };
}
