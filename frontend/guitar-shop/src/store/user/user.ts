import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {UserType} from '../../types/state';
import {checkAuthAction, fetchMyListMoviesAction, loginAction, postToggleMyListMovieAction} from '../api-actions';

export const initialState: UserType = {
  id: null,
  name: null,
  email: null,
  avatarUrl: null,
  token: null,
  myList: [],
};

export const user = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMyListMoviesAction.fulfilled, (state, action) => {
        state.myList = action.payload;
      });

    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
        state.token = action.payload.token;
        state.myList = action.payload.myList;
      });

    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
        state.token = action.payload.token;
        state.myList = action.payload.myList;
      });

    builder
      .addCase(postToggleMyListMovieAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite && !state.myList.find((movie) => movie.id === action.payload.id)) {
          state.myList.push(action.payload);
        } else {
          state.myList = state.myList.filter((movie) => movie.id !== action.payload.id);
        }
      });
  }
});
