import { Link } from 'react-router-dom';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../hooks/store-hooks';
import { deleteProductAction } from '../../store/api-actions';
import { deleteProductFromStateAction } from '../../store/products/actions';

type ProductCardPropType = {
  id: string;
  name: string;
  image: string;
  postedDate: string;
  price: number;
}

export default function ProductCard({id, name, image, postedDate, price}: ProductCardPropType) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteProductAction({ productId: id }));
    dispatch(deleteProductFromStateAction(id));
  }

  return(
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img
          src={image}
          srcSet={image} width="36" height="93"
          alt={`Изображение гитары ${id }`}
        />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={PageRouteEnum.Product.concat(`/${id}`)}>
            <p className="catalog-item__data-title">
              {name}
            </p>
          </Link>
          <br/>
          <p className="catalog-item__data-date">Дата добавления {dayjs(postedDate).format('DD.MM.YYYY')}</p>
          <p className="catalog-item__data-price">{price}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link className="button button--small button--black-border"
          to={PageRouteEnum.EditProduct.concat(`/${id}`)}
          aria-label="Редактировать товар"
        >
          Редактировать
        </Link>
        <button onClick={handleDelete} className="button button--small button--black-border" type="submit"
          aria-label="Удалить товар"
        >Удалить
        </button>
      </div>
    </li>
  );
}
