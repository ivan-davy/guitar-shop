import {HomeType, State} from '../../types/state';
import {MovieType} from '../../types/types';
import {Namespace} from '../../const';

export const getHomeData = (state: State): HomeType => state[Namespace.Home];

export const getFeaturedMovie = (state: State): MovieType | null => state[Namespace.Home].featuredMovie;
export const getSelectedGenre = (state: State): string => state[Namespace.Home].selectedGenre;
export const getMovies = (state: State): MovieType[] => state[Namespace.Home].movies;


