import {Route, Routes} from 'react-router-dom';
import {AuthorizationStatusEnum} from '../../const/authorization-status.enum';
import {useAppSelector} from '../../hooks/store-hooks';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import {getAuthData} from '../../store/service/selectors';
import { PageRouteEnum } from "../../const/routes/page-route.enum";
import AdminRoute from "../admin-route/admin-route";


function App(): JSX.Element {
  const authData.authorizationStatus = useAppSelector(getAuthData);

  if (authData === AuthorizationStatusEnum.Unknown) {
    return (
      <LoadingSpinner/>
    );
  }
  return (
    <Routes>
      <Route
        path={PageRouteEnum.SignIn}
        element={<SignInScreen/>}
      />
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
    </Routes>
  );
}

export default App;
