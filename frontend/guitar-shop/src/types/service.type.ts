import { AuthorizationStatusEnum } from "../const/authorization-status.enum";

export type ServiceType = {
  isDataLoading: boolean;
  authData: {
    status: AuthorizationStatusEnum;
    adminRights: boolean;
  };

}
