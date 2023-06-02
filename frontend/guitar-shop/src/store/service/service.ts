import { createSlice } from '@reduxjs/toolkit';
import { ServiceStateType } from '../../types/states/service-state.type';
import { setLoadingStatusAction } from './actions';
import {
  checkAuthAction, deleteProductAction, fetchActiveAction, fetchProductsDataAction, loginAction,
  logoutAction, updateProductAction
} from '../api-actions';
import { AuthorizationStatusEnum } from '../../const/authorization-status.enum';
import { NamespaceEnum } from '../../const/namespace.enum';

export const initialState: ServiceStateType = {
  authData: {
    status: AuthorizationStatusEnum.Unknown,
  },
  isDataLoading: false,
};

export const service = createSlice({
  name: NamespaceEnum.Service,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setLoadingStatusAction, (state, action) => {
        state.isDataLoading = action.payload;
      });

    builder
      .addCase(fetchProductsDataAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductsDataAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchProductsDataAction.rejected, (state) => {
        state.isDataLoading = false;
      });


    builder
      .addCase(fetchActiveAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchActiveAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchActiveAction.rejected, (state) => {
        state.isDataLoading = false;
      });

    builder
      .addCase(updateProductAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(updateProductAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(updateProductAction.rejected, (state) => {
        state.isDataLoading = false;
      });

    builder
      .addCase(deleteProductAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(deleteProductAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(deleteProductAction.rejected, (state) => {
        state.isDataLoading = false;
      });

    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authData.status = AuthorizationStatusEnum.Auth;
        state.isDataLoading = false;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authData.status = AuthorizationStatusEnum.NoAuth;
        state.isDataLoading = false;
      });

    builder
      .addCase(loginAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authData.status = AuthorizationStatusEnum.Auth;
        state.isDataLoading = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authData.status = AuthorizationStatusEnum.NoAuth;
        state.isDataLoading = false;
      });

    builder
      .addCase(logoutAction.fulfilled, (state) => {
        state.authData.status = AuthorizationStatusEnum.NoAuth;
      });
  }
});
