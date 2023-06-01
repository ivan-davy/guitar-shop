import React, { FormEvent, useReducer, useState } from 'react';
import { ProductType } from '../../types/product.type';
import { AvailableGuitarStringsEnum, AvailableGuitarTypesEnum } from '../../const/available-products';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../hooks/store-hooks';
import { postProductAction } from '../../store/api-actions';
import { FormStatusEnum } from '../../const/form-status.enum';
import { useNavigate } from 'react-router-dom';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { validateProductState } from '../../util/validate-product-state';
import { toast } from 'react-toastify';

function reducer(state: ProductType, action: {type: string; payload: string | number}): ProductType {
  switch (action.type) {
    case 'name-change': {
      return {
        ...state,
        name: action.payload as string,
      } as ProductType;
    }
    case 'price-change': {
      return {
        ...state,
        price: action.payload as number,
      } as ProductType;
    }
    case 'vendor-code-change': {
      return {
        ...state,
        vendorCode: action.payload as string,
      } as ProductType;
    }
    case 'description-change': {
      return {
        ...state,
        description: action.payload as string,
      } as ProductType;
    }
    case 'type-change': {
      return {
        ...state,
        type: action.payload as string,
      } as ProductType;
    }
    case 'strings-change': {
      return {
        ...state,
        strings: action.payload as number,
      } as ProductType;
    }
  }
  throw Error(`Unknown action: ${ action.type}`);
}

const initialState: ProductType = {
  name: '',
  description: '',
  postedDate: dayjs().toISOString(),
  price: 0,
  vendorCode: '',
  image: 'PLACEHOLDER-IMAGE-STRING.png', //TODO: сделать загрузку изображения
  type: AvailableGuitarTypesEnum.Acoustic,
  strings: AvailableGuitarStringsEnum.Four,
};

export default function AddProduct(): JSX.Element {
  const [formStatus, setFormStatus] = useState(FormStatusEnum.Available);
  const [state, reducerDispatch] = useReducer(reducer, initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleNameChange(evt: React.FormEvent<HTMLInputElement>) {
    reducerDispatch({
      type: 'name-change',
      payload: evt.currentTarget.value
    });
  }
  function handlePriceChange(evt: React.FormEvent<HTMLInputElement>) {
    reducerDispatch({
      type: 'price-change',
      payload: evt.currentTarget.value
    });
  }
  function handleVendorCodeChange(evt: React.FormEvent<HTMLInputElement>) {
    reducerDispatch({
      type: 'vendor-code-change',
      payload: evt.currentTarget.value
    });
  }
  function handleDescriptionChange(evt: React.FormEvent<HTMLTextAreaElement>) {
    reducerDispatch({
      type: 'description-change',
      payload: evt.currentTarget.value
    });
  }
  function handleTypeChange(evt: React.FormEvent<HTMLInputElement>) {
    reducerDispatch({
      type: 'type-change',
      payload: evt.currentTarget.value
    });
  }
  function handleStringsChange(evt: React.FormEvent<HTMLInputElement>) {
    reducerDispatch({
      type: 'strings-change',
      payload: Number(evt.currentTarget.value)
    });
  }
  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setFormStatus(FormStatusEnum.Disabled);
    const validationResult = validateProductState(state);
    if (validationResult.error) {
      toast.error(validationResult.error.message);
      setFormStatus(FormStatusEnum.Available);
      return;
    }
    setFormStatus(FormStatusEnum.Submitted);
    dispatch(postProductAction({product: state, setFormSubmitStateCb: (status) => setFormStatus(status)}));
    navigate(PageRouteEnum.Products);
  }

  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товары</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Новый товар</a>
            </li>
          </ul>
          <form className="add-item__form" onSubmit={handleSubmit}>
            <div className="add-item__form-left">
              <div className="edit-item-image add-item__form-image">
                <div className="edit-item-image__image-wrap">
                </div>
                <div className="edit-item-image__btn-wrap">
                  <button className="button button--small button--black-border edit-item-image__btn">Добавить
                  </button>
                  <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                </div>
              </div>
              <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
                <input type="radio" id="guitar" name="item-type" value="Acoustic"
                  checked={state.type === AvailableGuitarTypesEnum.Acoustic}
                  onChange={handleTypeChange}
                />
                <label htmlFor="guitar">Акустическая гитара</label>
                <input type="radio" id="el-guitar" name="item-type" value="Electric"
                  checked={state.type === AvailableGuitarTypesEnum.Electric}
                  onChange={handleTypeChange}
                />
                <label htmlFor="el-guitar">Электрогитара</label>
                <input type="radio" id="ukulele" name="item-type" value="Ukulele"
                  checked={state.type === AvailableGuitarTypesEnum.Ukulele}
                  onChange={handleTypeChange}
                />
                <label htmlFor="ukulele">Укулеле</label>
              </div>
              <div className="input-radio add-item__form-radio"><span>Количество струн</span>
                <input type="radio" id="string-qty-4" name="string-qty" value="4"
                  checked={state.strings === AvailableGuitarStringsEnum.Four}
                  onChange={handleStringsChange}
                />
                <label htmlFor="string-qty-4">4</label>
                <input type="radio" id="string-qty-6" name="string-qty" value="6"
                  checked={state.strings === AvailableGuitarStringsEnum.Six}
                  onChange={handleStringsChange}
                />
                <label htmlFor="string-qty-6">6</label>
                <input type="radio" id="string-qty-7" name="string-qty" value="7"
                  checked={state.strings === AvailableGuitarStringsEnum.Seven}
                  onChange={handleStringsChange}
                />
                <label htmlFor="string-qty-7">7</label>
                <input type="radio" id="string-qty-12" name="string-qty" value="12"
                  checked={state.strings === AvailableGuitarStringsEnum.Twelve}
                  onChange={handleStringsChange}
                />
                <label htmlFor="string-qty-12">12</label>
              </div>
            </div>
            <div className="add-item__form-right">
              <div className="custom-input add-item__form-input">
                <label><span>Дата добавления товара</span>
                  <input type="text" name="date" value={dayjs(state.postedDate).format('DD.MM.YYYY')} readOnly/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input">
                <label><span>Введите наименование товара</span>
                  <input type="text" name="title" value={state.name} onChange={handleNameChange} placeholder="Наименование"/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                <label><span>Введите цену товара</span>
                  <input type="text" name="price" value={state.price} onChange={handlePriceChange} placeholder="Цена"/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input">
                <label><span>Введите артикул товара</span>
                  <input type="text" name="sku" value={state.vendorCode} onChange={handleVendorCodeChange} placeholder="Артикул товара"/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-textarea add-item__form-textarea">
                <label><span>Введите описание товара</span>
                  <textarea name="description" placeholder="" onInput={handleDescriptionChange} value={state.description}></textarea>
                </label>
                <p>Заполните поле</p>
              </div>
            </div>
            <div className="add-item__form-buttons-wrap">
              <button className="button button--small add-item__form-button" type="submit" disabled={formStatus === FormStatusEnum.Disabled}>
                Сохранить изменения
              </button>
              <button className="button button--small add-item__form-button" type="button">
                Вернуться к списку товаров
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
