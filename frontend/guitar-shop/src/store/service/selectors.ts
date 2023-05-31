import {State} from '../../types/state';
import {AuthorizationStatus, Namespace} from '../../const';

export const getLoadingStatus = (state: State): boolean => state[Namespace.Service].isDataLoading;
export const getAuthStatus = (state: State): AuthorizationStatus => state[Namespace.Service].authStatus;

