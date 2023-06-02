import { StateType } from '../../types/states/state.type';
import { NamespaceEnum } from '../../const/namespace.enum';
import { ProductType } from '../../types/product.type';

export const getProductsData = (state: StateType): {
  products: ProductType[];
  totalProductQty: number;
} => state[NamespaceEnum.Products].productData;


