import { StateType } from "../../types/states/state.type";
import { ProductsStateType } from "../../types/states/products-state.type";
import { NamespaceEnum } from "../../const/namespace.enum";
import { ProductType } from "../../types/product.type";

export const getProductsData = (state: StateType): ProductsStateType => state[NamespaceEnum.Products];
export const getProducts = (state: StateType): ProductType[] => state[NamespaceEnum.Products].products;


