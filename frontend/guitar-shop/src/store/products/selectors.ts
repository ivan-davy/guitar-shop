import { StateType } from '../../types/states/state.type';
import { NamespaceEnum } from '../../const/namespace.enum';
import { ProductType } from '../../types/product.type';

export const getProducts = (state: StateType): ProductType[] => state[NamespaceEnum.Products].products;


