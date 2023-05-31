import {Route, Routes} from 'react-router-dom';
import {AuthorizationStatusEnum} from '../../const/authorization-status.enum';
import {useAppSelector} from '../../hooks/store-hooks';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import {getAuthStatus} from '../../store/service/selectors';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
//import AdminRoute from '../admin-route/admin-route';
import { getAdminRightsValue } from '../../store/user/selectors';
import SignInScreen from '../../pages/sign-in/sign-in.screen';
import CommonLayout from '../../pages/common-layout/common-layout';


function App(): JSX.Element {
  const authData = {
    authStatus: useAppSelector(getAuthStatus),
    adminRights: useAppSelector(getAdminRightsValue),
  };

  if (authData.authStatus === AuthorizationStatusEnum.Unknown) {
    return (
      <LoadingSpinner/>
    );
  }
  return (
    <Routes>
      <Route
        path={PageRouteEnum.SignIn}
        element={<CommonLayout/>}
      >
        <Route path={''} element={<SignInScreen/>} />
      </Route>
    </Routes>
  );
}

export default App;

/*
<Route
        path={PageRouteEnum.Register}
        element={<RegisterScreen/>}
      />
      <Route
        path={PageRouteEnum.Products}
        element={
          <AdminRoute authorizationData={authData}>
            <ProductsScreen/>
          </AdminRoute>
        }
      />
      <Route
        path={PageRouteEnum.Product}
        element={
          <AdminRoute authorizationData={authData}>
            <ProductsScreen/>
          </AdminRoute>
        }
      />
      <Route
        path={PageRouteEnum.AddProduct}
        element={
          <AdminRoute authorizationData={authData}>
            <ProductsScreen/>
          </AdminRoute>
        }
      />
      <Route
        path='*'
        element={<NotFoundScreen/>}
      />
 */
