import {Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks/store-hooks';
import {getAuthStatus} from '../../store/service/selectors';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { getAdminRightsValue } from '../../store/user/selectors';
import SignInScreen from '../../pages/sign-in/sign-in.screen';
import CommonLayout from '../../pages/common-layout/common-layout';
import AdminRoute from '../admin-route/admin-route';
import ProductsMenu from '../products-menu/products-menu';


function App(): JSX.Element | null {
  const authData = {
    authStatus: useAppSelector(getAuthStatus),
    adminRights: useAppSelector(getAdminRightsValue),
  };

  return (
    <Routes>
      <Route
        path={PageRouteEnum.SignIn}
        element={<CommonLayout/>}
      >
        <Route path={''} element={<SignInScreen/>} />
      </Route>

      <Route
        path={PageRouteEnum.Products}
        element={
          <AdminRoute authorizationData={authData}>
            <CommonLayout/>
          </AdminRoute>
        }
      >
        <Route path={''} element={<ProductsMenu/>}/>
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
