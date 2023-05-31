import { createAction } from "@reduxjs/toolkit";

export const changeFiltersAction = createAction('products/filters/change', (filters) => ({
  payload: filters,
}));

export const changeSortingAction = createAction('products/sorting/change', (sorting) => ({
  payload: sorting,
}));
