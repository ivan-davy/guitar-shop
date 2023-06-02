import { createAction } from '@reduxjs/toolkit';
import { FiltersType } from '../../types/filters-type';
import { SortingType } from '../../types/sorting-type';

export const changeFiltersAction = createAction('products/filters/change',
  (filters: FiltersType): { payload: FiltersType } => ({
    payload: filters,
  }));

export const changeSortingAction = createAction('products/sorting/change',
  (sorting: SortingType) => ({ payload: sorting, }));

export const deleteProductFromStateAction = createAction('products/delete-by-id',
  (id: string) => ({ payload: id }));


