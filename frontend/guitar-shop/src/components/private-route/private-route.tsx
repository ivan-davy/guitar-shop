import {Navigate} from 'react-router-dom';
import {PageRouteEnum} from '../../const/routes/page-route.enum';
import {AuthorizationStatusEnum} from '../../const/authorization-status.enum';

type PrivateRoutePropsType = {
  authorizationStatus: string;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRoutePropsType): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatusEnum.Auth
      ? children
      : <Navigate to={PageRouteEnum.SignIn} />
  );
}
