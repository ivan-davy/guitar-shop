import { StateType } from "../../types/states/state.type";
import { NamespaceEnum } from "../../const/namespace.enum";
import { AuthorizationStatusEnum } from "../../const/authorization-status.enum";

export const getLoadingStatus = (state: StateType): boolean => state[NamespaceEnum.Service].isDataLoading;
export const getAuthData = (state: StateType): AuthorizationStatusEnum => state[NamespaceEnum.Service].authData.status;

