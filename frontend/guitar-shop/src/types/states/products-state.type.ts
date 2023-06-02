import { ProductType } from '../product.type';

export type ProductsStateType = {
  productData: {
    products: ProductType[];
    totalProductQty: number;
  };
  filters: {
    type: string[];
    strings: number[];
  };
  sorting: {
    by: string | null;
    direction: number | null;
  };
  currentPage: number;
}
