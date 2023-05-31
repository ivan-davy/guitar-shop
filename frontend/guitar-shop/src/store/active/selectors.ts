import { NamespaceEnum } from '../../const/namespace.enum';
import { StateType } from "../../types/states/state.type";
import { ActiveStateType } from "../../types/states/active-state.type";

export const getActiveData = (state: StateType): ActiveStateType => state[NamespaceEnum.ActiveProduct];
