import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getActiveData } from '../../store/active/selectors';
import { fetchActiveAction } from '../../store/api-actions';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { ActiveStateType } from '../../types/states/active-state.type';

enum TabEnum {
  Specs = 'Specs',
  Description = 'Description'
}

export default function ProductInfo(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState(TabEnum.Specs);

  const { product }: ActiveStateType = useAppSelector(getActiveData);

  useEffect(() => {
    if (product?.id?.toString() !== String(params.id)) {
      dispatch(fetchActiveAction(params.id as string));
    }
  }, [dispatch, product?.id, params.id]);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><Link className="link" to={PageRouteEnum.SignIn}>Вход</Link>
          </li>
          <li className="breadcrumbs__item"><Link className="link" to={PageRouteEnum.NotImplemented}>Каталог</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link to={`${PageRouteEnum.Product}/${params.id as string}`} className="link">{product?.name}</Link>
          </li>
        </ul>

        <div className="product-container">
          <img className="product-container__img"
            src={product?.image}
            srcSet={product?.image}
            width="90" height="235" alt={product?.name}
          />

          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{product?.name}</h2>
            <br/>
            <br/>
            <div className="tabs">
              <a className={`button ${selectedTab === TabEnum.Specs ? '' : 'button--black-border'} button--medium tabs__button`}
                onClick={() => setSelectedTab(TabEnum.Specs)}
              >Характеристики
              </a>
              <a className={`button ${selectedTab === TabEnum.Description ? '' : 'button--black-border'} button--medium tabs__button`}
                onClick={() => setSelectedTab(TabEnum.Description)}
              >Описание
              </a>
              <div className="tabs__content" id="specs">
                <table className={`tabs__table ${selectedTab !== TabEnum.Specs ? 'hidden' : ''}`}>
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{product?.vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{product?.type}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{`${String(product?.strings)} струнная`}</td>
                    </tr>
                  </tbody>
                </table>
                <p className={`tabs__product-description ${selectedTab !== TabEnum.Description ? 'hidden' : ''}`}>
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
