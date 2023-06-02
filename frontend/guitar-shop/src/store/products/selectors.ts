import { StateType } from '../../types/states/state.type';
import { NamespaceEnum } from '../../const/namespace.enum';
import { ProductType } from '../../types/product.type';

export const getProducts = (state: StateType): ProductType[] => state[NamespaceEnum.Products].productData.products;

export const getFilters = (state: StateType): {
  type: string[];
  strings: number[];
} => state[NamespaceEnum.Products].filters;

export const getSorting = (state: StateType): {
  by: string | null;
  direction: number | null;
} => state[NamespaceEnum.Products].sorting;
