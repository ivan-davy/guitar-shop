import Filters from '../filters/filters';
import Sorting from '../sorting/sorting';
import ProductList from '../product-list/product-list';
import PageSelector from '../page-selector/page-selector';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getProducts } from '../../store/products/selectors';
import { useEffect } from 'react';
import { fetchProductsAction } from '../../store/api-actions';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { useNavigate } from 'react-router-dom';

export default function ProductsMenu(): JSX.Element {
  const products = useAppSelector(getProducts);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleAddProductClick() {
    navigate(PageRouteEnum.AddProduct);
  }

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, []);

  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товары</a>
            </li>
          </ul>
          <div className="catalog">
            <Filters/>
            <Sorting/>
            <ProductList items={products}/>
          </div>

          <button onClick={handleAddProductClick} className="button product-list__button button--red button--big">Добавить новый товар</button>
          <div className="pagination product-list__pagination">
            <PageSelector/>
          </div>
        </div>
      </section>
    </main>
  );
}
