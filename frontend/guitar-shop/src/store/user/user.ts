import {createSlice} from '@reduxjs/toolkit';
import {checkAuthAction, loginAction} from '../api-actions';
import { UserType } from '../../types/user.type';
import { NamespaceEnum } from '../../const/namespace.enum';

export const initialState: UserType = {
  id: null,
  name: null,
  email: null,
  hasAdminRights: false,
  token: null
};

export const user = createSlice({
  name: NamespaceEnum.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.hasAdminRights = action.payload.hasAdminRights;
      });

    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.hasAdminRights = action.payload.hasAdminRights;
      });
  }
});
