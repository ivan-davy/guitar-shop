import {createAsyncThunk} from '@reduxjs/toolkit';
import {ActiveType, AppDispatch, HomeType, State, UserType} from '../types/state';
import {AxiosInstance} from 'axios';
import {ApiRoute, FormStatus, PageRoute, SIMILAR_SHOWN_QTY} from '../const';
import {AuthDataType, MovieType, NewReviewType, ReviewType,} from '../types/types';
import {redirectToRouteAction, setLoadingStatusAction} from './service/actions';
import {Omit} from '@reduxjs/toolkit/dist/tsHelpers';
import {dropToken, saveToken} from '../api/token';
import React from 'react';
import {toast} from 'react-toastify';

type FetchHomeDataReturnType = Omit<HomeType, 'selectedGenre'>;
export const fetchHomeDataAction = createAsyncThunk<FetchHomeDataReturnType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'products/apiGetData',
  async (_, {dispatch, extra: api}) => {
    const homeData: FetchHomeDataReturnType = {
      movies: [],
      featuredMovie: null,
    };
    try {
      homeData.movies = (await api.get<MovieType[]>(ApiRoute.Movies)).data;
      homeData.featuredMovie = (await api.get<MovieType>(ApiRoute.Featured)).data;
    }
    catch (err) {
      dispatch(redirectToRouteAction(PageRoute.NotFound));

      throw err;
    }

    return homeData;
  },
);


type FetchActiveDataReturnType = ActiveType;
export const fetchActiveDataAction = createAsyncThunk<FetchActiveDataReturnType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'active/apiGetDataById',
  async (movieId, {dispatch, extra: api}) => {
    const activeData: FetchActiveDataReturnType = {
      movie: null,
      similarMovies: [],
      reviews: [],
    };
    try {
      activeData.movie = (await api.get<MovieType>(`${ApiRoute.Movies}/${movieId}`)).data;
      activeData.similarMovies = (await api.get<MovieType[]>(`${ApiRoute.Movies}/${movieId}${ApiRoute.Similar}`))
        .data.slice(0, SIMILAR_SHOWN_QTY);
      activeData.reviews = (await api.get<ReviewType[]>(`${ApiRoute.Reviews}/${movieId}`)).data;

      return activeData;
    } catch (err) {
      toast.error('Something went wrong...');
      dispatch(redirectToRouteAction(PageRoute.NotFound));

      throw err;
    }
  }
);

type PostUserReviewReturnType = ReviewType[];
export const postUserReviewAction = createAsyncThunk<PostUserReviewReturnType, {
  userReview: NewReviewType;
  setFormSubmitStateCb: React.Dispatch<React.SetStateAction<number>>;
  activeId: number;
  }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiPostNewReview',
  async (formData, {dispatch, extra: api}) => {
    const activeId = formData.activeId;
    try {
      const updatedReviews: ReviewType[] = (await api.post<PostUserReviewReturnType>(
        `${ApiRoute.Reviews}/${activeId}`, formData.userReview)).data;
      formData.setFormSubmitStateCb(FormStatus.Submitted);
      dispatch(redirectToRouteAction(`/what-to-watch${PageRoute.Movie}/${activeId}`));

      return updatedReviews;
    } catch (err) {
      toast.error('Something went wrong...');
      formData.setFormSubmitStateCb(FormStatus.Available);

      throw err;
    }
  }
);

type PostToggleMyListMovieActionReturnType = MovieType;
export const postToggleMyListMovieAction = createAsyncThunk<PostToggleMyListMovieActionReturnType, {
  movieId: number;
  actionId: number;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiPostToggleMyListMovie',
  async ({actionId, movieId}, {dispatch, extra: api}) => {
    const updatedMovie: MovieType = (await api.post<PostToggleMyListMovieActionReturnType>(
      `${ApiRoute.MyList}/${movieId}/${actionId}`)).data;
    return updatedMovie;
  }
);


type FetchMyListMoviesReturnType = MovieType[];
export const fetchMyListMoviesAction = createAsyncThunk<FetchMyListMoviesReturnType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiGetMyList',
  async (_, {dispatch, extra: api}) =>
    (await api.get<MovieType[]>(`${ApiRoute.MyList}`)).data);


type CheckAuthReturnType = UserType;
export const checkAuthAction = createAsyncThunk<CheckAuthReturnType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiCheckUserAuth',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatusAction(true));
    const userData = (await api.get<Omit<CheckAuthReturnType, 'myList'>>(ApiRoute.Login)).data;
    const myListMovies = (await api.get<MovieType[]>(`${ApiRoute.MyList}`)).data;

    const completeUserData: CheckAuthReturnType = {
      id: userData.id,
      name: userData.name,
      avatarUrl: userData.avatarUrl,
      email: userData.email,
      token: userData.token,
      myList: myListMovies,
    };
    saveToken(completeUserData.token as string);

    return completeUserData;
  },
);


type LoginReturnType = UserType;
export const loginAction = createAsyncThunk<LoginReturnType, AuthDataType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiLogin',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<Omit<LoginReturnType, 'myList'>>(ApiRoute.Login, {email, password});

    const userData: LoginReturnType = {
      id: data.id,
      name: data.name,
      avatarUrl: data.avatarUrl,
      email: data.email,
      token: data.token,
      myList: [],
    };

    saveToken(userData.token as string);
    return userData;
  },
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiLogout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);

    dropToken();
  },
);
