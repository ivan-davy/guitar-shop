import Filters from '../filters/filters';
import Sorting from '../sorting/sorting';
import ProductList from '../product-list/product-list';
import PageSelector from '../page-selector/page-selector';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function ProductsMenu(): JSX.Element {
  const navigate = useNavigate();

  function handleAddProductClick() {
    navigate(PageRouteEnum.AddProduct);
  }

  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={PageRouteEnum.SignIn}>Вход</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товары</a>
            </li>
          </ul>
          <div className="catalog">
            <Filters/>
            <Sorting/>
            <ProductList/>
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
