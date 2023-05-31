import {createAction} from '@reduxjs/toolkit';

export const genreChangeAction = createAction('genreHome/change', (newGenre) => ({
  payload: newGenre as string,
}));

export const setLoadingStatusAction = createAction<boolean>('service/setLoadingStatus');
export const redirectToRouteAction = createAction<string>('service/redirectToRoute');


