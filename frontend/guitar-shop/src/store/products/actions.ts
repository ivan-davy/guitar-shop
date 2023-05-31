import { createAction } from '@reduxjs/toolkit';

type FiltersType = {
  type: string[];
  strings: number[];
}

type SortingType = {
  by: string | null;
  direction: string | null;
}

export const changeFiltersAction = createAction('products/filters/change',
  (filters: FiltersType): { payload: FiltersType } => ({
    payload: filters,
  }));

export const changeSortingAction = createAction('products/sorting/change',
  (sorting: SortingType) => ({ payload: sorting, }));
