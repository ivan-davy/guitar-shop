import {Navigate} from 'react-router-dom';
import {PageRouteEnum} from '../../const/routes/page-route.enum';

type AdminRoutePropsType = {
  authorizationData: {
    authorizationStatus: string;
    hasAdminRights: boolean;
  };
  children: JSX.Element;
}

export default function AdminRoute(props: AdminRoutePropsType): JSX.Element {
  const {authorizationData, children} = props;

  return (
    authorizationData.hasAdminRights && authorizationData.authorizationStatus
      ? children
      : <Navigate to={PageRouteEnum.SignIn} />
  );
}
