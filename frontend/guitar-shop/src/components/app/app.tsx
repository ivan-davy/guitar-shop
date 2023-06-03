import {Route, Routes} from 'react-router-dom';
import { useAppSelector } from '../../hooks/store-hooks';
import {getAuthStatus} from '../../store/service/selectors';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { getAdminRightsValue } from '../../store/user/selectors';
import SignIn from '../sign-in/sign-in';
import CommonLayout from '../../pages/common-layout/common-layout';
import AdminRoute from '../admin-route/admin-route';
import ProductsMenu from '../products-menu/products-menu';
import Register from '../register/register';
import ProductInfo from '../product-info/product-info';
import NotFound from '../not-found/not-found';
import AddProduct from '../add-product/add-product';
import EditProduct from '../edit-product/edit-product';


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
        <Route path={''} element={<SignIn/>} />
      </Route>

      <Route
        path={PageRouteEnum.Register}
        element={<CommonLayout/>}
      >
        <Route path={''} element={<Register/>} />
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

      <Route
        path={PageRouteEnum.Product}
        element={<CommonLayout/>}
      >
        <Route path={':id'} element={<ProductInfo/>}/>
      </Route>

      <Route
        path={PageRouteEnum.AddProduct}
        element={
          <AdminRoute authorizationData={authData}>
            <CommonLayout/>
          </AdminRoute>
        }
      >
        <Route path={''} element={<AddProduct/>}/>
      </Route>

      <Route
        path={PageRouteEnum.EditProduct}
        element={
          <AdminRoute authorizationData={authData}>
            <CommonLayout/>
          </AdminRoute>
        }
      >
        <Route path={':id'} element={<EditProduct/>}/>
      </Route>

      <Route
        path='*'
        element={<CommonLayout/>}
      >
        <Route path={'*'} element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;

/*

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

 */
