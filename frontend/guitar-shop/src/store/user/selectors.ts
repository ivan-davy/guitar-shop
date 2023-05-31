import {UserType, State} from '../../types/state';
import {Namespace} from '../../const';
import {MovieType} from '../../types/types';

export const getUserData = (state: State): UserType => state[Namespace.User];

export const getId = (state: State): number | null => state[Namespace.User].id;
export const getMyList = (state: State): MovieType[] => state[Namespace.User].myList;


