import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {StateType, AppDispatchType} from '../types/states/state.type';

export const useAppDispatch: () => AppDispatchType = () => useDispatch<AppDispatchType>();

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
