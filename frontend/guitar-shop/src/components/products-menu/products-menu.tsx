import Filters from '../filters/filters';
import Sorting from '../sorting/sorting';
import ProductList from '../product-list/product-list';
import PageSelector from '../page-selector/page-selector';
import { ProductType } from '../../types/product.type';

export default function ProductsMenu(): JSX.Element {
  const temp: ProductType[] = [{
    id: '1',
    name: 'GUITAR GUITAR GUITAR GUITAR GUITAR',
    description: 'TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST',
    postedDate: '2030-04-06T08:45:40.283Z',
    image: 'https://www.google.com/file/35.jpg',
    type: 'Acoustic',
    vendorCode: 'VENDORCODE111',
    strings: 6,
    price: 100000,
  }];

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
            <ProductList items={temp}/>
          </div>

          <button className="button product-list__button button--red button--big">Добавить новый товар</button>
          <div className="pagination product-list__pagination">
            <PageSelector/>
          </div>
        </div>
      </section>
    </main>
  );
}
