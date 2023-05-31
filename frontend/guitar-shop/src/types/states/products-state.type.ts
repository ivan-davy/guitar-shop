import { ProductType } from "../product.type";

export type ProductsStateType = {
  products: ProductType[],
  filters: {
    type: string[];
    strings: number[];
  }
  sorting: string;
  sortingDirection: string;
}
