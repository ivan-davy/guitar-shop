import {combineReducers} from '@reduxjs/toolkit';
import {NamespaceEnum} from '../const/namespace.enum';
import {products} from './products/products';
import {active} from './active/active';
import {user} from './user/user';
import {service} from './service/service';

export const rootReducer = combineReducers({
  [NamespaceEnum.Products]: products.reducer,
  [NamespaceEnum.ActiveProduct]: active.reducer,
  [NamespaceEnum.User]: user.reducer,
  [NamespaceEnum.Service]: service.reducer,
});
