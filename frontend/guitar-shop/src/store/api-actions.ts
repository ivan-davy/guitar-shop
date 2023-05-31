import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { redirectToRouteAction, setLoadingStatusAction } from './service/actions';
import { Omit } from '@reduxjs/toolkit/dist/tsHelpers';
import { dropToken, saveToken } from '../api/token';
import React from 'react';
import { toast } from 'react-toastify';
import { ProductType } from '../types/product.type';
import { AppDispatchType, StateType } from '../types/states/state.type';
import { ApiRouteEnum } from '../const/routes/api-route.enum';
import { PageRouteEnum } from '../const/routes/page-route.enum';
import { FormStatusEnum } from '../const/form-status.enum';
import { ProductUpdateType } from '../types/product-update.type';
import { UserType } from '../types/user.type';
import { AuthDataType } from '../types/auth-data.type';

type FetchProductsReturnType = ProductType[];
export const fetchProductsAction = createAsyncThunk<FetchProductsReturnType, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'products/api/get-all',
  async (_, {dispatch, extra: api}) => {
    let products = [] as FetchProductsReturnType;
    try {
      products = (await api.get<ProductType[]>(ApiRouteEnum.Products)).data;
    }
    catch (err) {
      dispatch(redirectToRouteAction(PageRouteEnum.NotFound));
      throw err;
    }

    return products;
  },
);


type FetchActiveReturnType = ProductType;
export const fetchActiveAction = createAsyncThunk<FetchActiveReturnType, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'products/api/get-by-id',
  async (productId, {dispatch, extra: api}) => {
    try {
      return (await api.get<ProductType>(`${ApiRouteEnum.Products}/${productId}`)).data;
    } catch (err) {
      toast.error('Something went wrong...');
      dispatch(redirectToRouteAction(PageRouteEnum.NotFound));
      throw err;
    }
  }
);

type PostProductReturnType = ProductType;
export const postProductAction = createAsyncThunk<PostProductReturnType, {
  product: ProductType;
  setFormSubmitStateCb: React.Dispatch<React.SetStateAction<number>>;
  }, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'products/api/new',
  async (formData, {dispatch, extra: api}) => {
    try {
      const newProduct = (await api.post<ProductType>(
        `${ApiRouteEnum.Products}`, formData.product)).data;
      formData.setFormSubmitStateCb(FormStatusEnum.Submitted);
      dispatch(redirectToRouteAction(`/guitar-shop${PageRouteEnum.Products}/${newProduct.id}`));

      return newProduct;
    } catch (err) {
      toast.error('Something went wrong...');
      formData.setFormSubmitStateCb(FormStatusEnum.Available);

      throw err;
    }
  }
);

type UpdateProductReturnType = ProductUpdateType;
export const updateProductAction = createAsyncThunk<UpdateProductReturnType, {
  product: ProductUpdateType;
  setFormSubmitStateCb: React.Dispatch<React.SetStateAction<number>>;
  productId: string;
}, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'products/api/update-by-id',
  async (formData, {dispatch, extra: api}) => {
    const productId = formData.productId;
    try {
      const updatedProduct = (await api.patch<ProductType>(
        `${ApiRouteEnum.Products}/${productId}`, formData.product)).data;
      formData.setFormSubmitStateCb(FormStatusEnum.Submitted);
      dispatch(redirectToRouteAction(`/guitar-shop${PageRouteEnum.Products}/${updatedProduct.id}`));

      return updatedProduct;
    } catch (err) {
      toast.error('Something went wrong...');
      formData.setFormSubmitStateCb(FormStatusEnum.Available);

      throw err;
    }
  }
);

export const deleteProductAction = createAsyncThunk<void, {
  productId: string;
}, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'products/api/delete-by-id',
  async (formData, {dispatch, extra: api}) => {
    const productId = formData.productId;
    try {
      (await api.delete<ProductType>(
        `${ApiRouteEnum.Products}/${productId}`)).data;
      dispatch(redirectToRouteAction(`/guitar-shop${PageRouteEnum.Products}`));
    } catch (err) {
      toast.error('Something went wrong...');
      throw err;
    }
  }
);

type CheckAuthReturnType = UserType;
export const checkAuthAction = createAsyncThunk<CheckAuthReturnType, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/api/check-auth',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatusAction(true));
    const userData = (await api.get<UserType>(ApiRouteEnum.SignIn)).data;

    const completeUserData: CheckAuthReturnType = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      hasAdminRights: userData.hasAdminRights,
      token: userData.token,
    };
    saveToken(completeUserData.token as string);

    return completeUserData;
  },
);


type LoginReturnType = UserType;
export const loginAction = createAsyncThunk<LoginReturnType, AuthDataType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/apiLogin',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserType>(ApiRouteEnum.SignIn, {email, password});

    const userData: LoginReturnType = {
      id: data.id,
      name: data.name,
      email: data.email,
      hasAdminRights: data.hasAdminRights,
      token: data.token,
    };

    saveToken(userData.token as string);
    return userData;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/apiLogout',
  async (_arg, {dispatch, extra: api}) => {
    //await api.delete(ApiRouteEnum.SignOut);
    dropToken();
  },
);
