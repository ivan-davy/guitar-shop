import {Navigate} from 'react-router-dom';
import {PageRouteEnum} from '../../const/routes/page-route.enum';
import { AuthorizationStatusEnum } from '../../const/authorization-status.enum';

type AdminRoutePropsType = {
  authorizationData: {
    authStatus: AuthorizationStatusEnum;
    adminRights: boolean;
  };
  children: JSX.Element;
}

export default function AdminRoute(props: AdminRoutePropsType): JSX.Element {
  const {authorizationData, children} = props;

  return (
    authorizationData.adminRights && authorizationData.authStatus === AuthorizationStatusEnum.Auth
      ? children
      : <Navigate to={PageRouteEnum.SignIn} />
  );
}
