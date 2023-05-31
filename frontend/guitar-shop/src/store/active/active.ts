import {ActiveStateType} from '../../types/states/active-state.type';
import {createSlice} from '@reduxjs/toolkit';
import {NamespaceEnum} from '../../const/namespace.enum';
import {fetchActiveAction} from '../api-actions';

export const initialState: ActiveStateType = {
  product: null,
};

export const active = createSlice({
  name: NamespaceEnum.ActiveProduct,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActiveAction.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  }
});
