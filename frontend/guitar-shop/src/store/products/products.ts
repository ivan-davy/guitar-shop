import {createSlice} from '@reduxjs/toolkit';
import { ProductsStateType } from '../../types/states/products-state.type';
import { NamespaceEnum } from '../../const/namespace.enum';
import {
  changeCurrentPageAction,
  changeFiltersAction,
  changeSortingAction,
  deleteProductFromStateAction
} from './actions';
import { fetchProductsDataAction } from '../api-actions';
import { ProductType } from '../../types/product.type';

export const initialState: ProductsStateType = {
  productData: {
    products: [] as ProductType[],
    totalProductQty: 0,
  },
  filters: {
    type: [] as string[],
    strings: [] as number[],
  },
  sorting: {
    by: null,
    direction: null,
  },
  currentPage: 1,
};

export const products = createSlice({
  name: NamespaceEnum.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsDataAction.fulfilled, (state, action) => {
        state.productData.products = action.payload.products;
        state.productData.totalProductQty = action.payload.totalProductQty;
      });

    builder
      .addCase(changeFiltersAction, (state, action) => {
        state.filters = action.payload;
      });

    builder
      .addCase(changeSortingAction, (state, action) => {
        state.sorting = action.payload;
      });

    builder
      .addCase(changeCurrentPageAction, (state, action) => {
        state.currentPage = action.payload;
      });

    builder
      .addCase(deleteProductFromStateAction, (state, action) => {
        state.productData.products = state.productData.products.filter((product) => product.id !== action.payload);
        state.productData.totalProductQty = state.productData.totalProductQty - 1;
      });
  }
});
