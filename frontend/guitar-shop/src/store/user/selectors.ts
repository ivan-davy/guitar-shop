import { NamespaceEnum } from '../../const/namespace.enum';
import { StateType } from '../../types/states/state.type';
import { UserType } from '../../types/user.type';

export const getUserData = (state: StateType): UserType => state[NamespaceEnum.User];
export const getAdminRightsValue = (state: StateType): boolean => state[NamespaceEnum.User].hasAdminRights;
export const getUserId = (state: StateType): string | null => state[NamespaceEnum.User].id ?? null;


