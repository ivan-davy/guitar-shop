import {createAction} from '@reduxjs/toolkit';

export const setLoadingStatusAction = createAction<boolean>('service/set-loading-status');
export const redirectToRouteAction = createAction<string>('service/redirect-to-route');


