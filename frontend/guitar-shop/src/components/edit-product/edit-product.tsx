import { Link, useParams } from 'react-router-dom';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { useEffect } from 'react';
import { ActiveStateType } from '../../types/states/active-state.type';
import { getActiveData } from '../../store/active/selectors';
import { fetchActiveAction } from '../../store/api-actions';
import dayjs from 'dayjs';

export default function EditProduct(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { product }: ActiveStateType = useAppSelector(getActiveData);

  useEffect(() => {
    if (product?.id?.toString() !== String(params.id)) {
      dispatch(fetchActiveAction(params.id as string));
    }
  }, [dispatch, product?.id, params.id]);

  return (
    <main className="page-content">
      <section className="edit-item">
        <div className="container">
          <h1 className="edit-item__title">СURT Z30 Plus</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={PageRouteEnum.SignIn}>Вход</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={PageRouteEnum.Products}>Товары</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link">{product?.name}</a>
            </li>
          </ul>
          <form className="edit-item__form" action="#" method="get">
            <div className="edit-item__form-left">
              <div className="edit-item-image edit-item__form-image">
                <div className="edit-item-image__image-wrap">
                  <img className="edit-item-image__image"
                    src={product?.image}
                    srcSet={product?.image}
                    width="133" height="332" alt={product?.name}
                  />
                </div>
                <div className="edit-item-image__btn-wrap">
                  <button className="button button--small button--black-border edit-item-image__btn">Заменить
                  </button>
                  <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                </div>
              </div>
              <div className="input-radio edit-item__form-radio"><span>Тип товара</span>
                <input type="radio" id="guitar" name="item-type" value="guitar"/>
                <label htmlFor="guitar">Акустическая гитара</label>
                <input type="radio" id="el-guitar" name="item-type" value="el-guitar" checked/>
                <label htmlFor="el-guitar">Электрогитара</label>
                <input type="radio" id="ukulele" name="item-type" value="ukulele"/>
                <label htmlFor="ukulele">Укулеле</label>
              </div>
              <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
                <input type="radio" id="string-qty-4" name="string-qty" value="4" checked/>
                <label htmlFor="string-qty-4">4</label>
                <input type="radio" id="string-qty-6" name="string-qty" value="6"/>
                <label htmlFor="string-qty-6">6</label>
                <input type="radio" id="string-qty-7" name="string-qty" value="7"/>
                <label htmlFor="string-qty-7">7</label>
                <input type="radio" id="string-qty-12" name="string-qty" value="12"/>
                <label htmlFor="string-qty-12">12</label>
              </div>
            </div>
            <div className="edit-item__form-right">
              <div className="custom-input edit-item__form-input">
                <label><span>Дата добавления товара</span>
                  <input type="text" name="date" value={dayjs(product?.postedDate).format('DD.MM.YYYY')} placeholder="Дата в формате 00.00.0000" readOnly/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input edit-item__form-input">
                <label><span>Наименование товара</span>
                  <input type="text" name="title" value={product?.name} placeholder="Наименование"/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input edit-item__form-input edit-item__form-input--price">
                <label><span>Цена товара</span>
                  <input type="text" name="price" value={product?.price} placeholder="Цена"/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input edit-item__form-input">
                <label><span>Артикул товара</span>
                  <input type="text" name="sku" value={product?.vendorCode} placeholder="Артикул товара"/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-textarea edit-item__form-textarea">
                <label><span>Описание товара</span>
                  <textarea name="description" placeholder="">
                    {product?.description}
                  </textarea>
                </label>
                <p>Заполните поле</p>
              </div>
            </div>
            <div className="edit-item__form-buttons-wrap">
              <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
              <button className="button button--small edit-item__form-button" type="button">Вернуться к списку товаров
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
