import {createSlice} from '@reduxjs/toolkit';
import { ProductsStateType } from "../../types/states/products-state.type";
import { NamespaceEnum } from "../../const/namespace.enum";
import { changeFiltersAction, changeSortingAction } from "./actions";

export const initialState: ProductsStateType = {
  products: [],
  filters: {
    type: [],
    strings: []
  },
  sorting: {
    by: null,
    direction: null,
  },
};

export const products = createSlice({
  name: NamespaceEnum.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
      });

    builder
      .addCase(changeFiltersAction, (state, action) => {
        state.filters = action.payload;
      });

    builder
      .addCase(changeSortingAction, (state, action) => {
        state.sorting = action.payload;
      });
  }
});
