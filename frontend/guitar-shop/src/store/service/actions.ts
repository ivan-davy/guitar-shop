import {createAction} from '@reduxjs/toolkit';

export const setLoadingStatusAction = createAction<boolean>('service/setLoadingStatus');
export const redirectToRouteAction = createAction<string>('service/redirectToRoute');


