import React, { FormEvent, useEffect, useReducer, useState } from 'react';
import {
  AvailableGuitarStringsEnum,
  AvailableGuitarTypesEnum,
  GUITAR_TYPES_NAMES
} from '../../const/available-products.enum';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { fetchActiveAction, updateProductAction } from '../../store/api-actions';
import { FormStatusEnum } from '../../const/form-status.enum';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { validateProductState } from '../../util/validate-product-state';
import { toast } from 'react-toastify';
import { reducer } from '../../util/product-form/reducer';
import { INITIAL_PRODUCT_STATE } from '../../util/product-form/initial-product-state.const';
import { getActiveData } from '../../store/active/selectors';
import { BASE_URL } from '../../api/api';
import { filterLockLogic } from '../../util/filter-lock-logic';

export default function EditProduct(): JSX.Element {
  const [formStatus, setFormStatus] = useState(FormStatusEnum.Available);
  const [state, reducerDispatch] = useReducer(reducer, INITIAL_PRODUCT_STATE);
  const allowedFilterOptions = filterLockLogic({ type: [state.type], strings: [state.strings] });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { product } = useAppSelector(getActiveData);
  const params = useParams();

  // eslint-disable-next-line no-console
  console.log(state);

  function handleNameChange(evt: React.FormEvent<HTMLInputElement>) {
    evt.preventDefault();
    reducerDispatch({
      type: 'name-change',
      payload: evt.currentTarget.value
    });
  }
  function handlePriceChange(evt: React.FormEvent<HTMLInputElement>) {
    evt.preventDefault();
    reducerDispatch({
      type: 'price-change',
      payload: Number(evt.currentTarget.value)
    });
  }
  function handleVendorCodeChange(evt: React.FormEvent<HTMLInputElement>) {
    evt.preventDefault();
    reducerDispatch({
      type: 'vendor-code-change',
      payload: evt.currentTarget.value
    });
  }
  function handleDescriptionChange(evt: React.FormEvent<HTMLTextAreaElement>) {
    evt.preventDefault();
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
  function handleImageChange(evt: React.FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    reducerDispatch({
      type: 'image-change',
      payload: evt.currentTarget.value
    });
  }
  function handleImageDeletion(evt: React.FormEvent<HTMLButtonElement>) {
    evt.preventDefault();
    reducerDispatch({
      type: 'image-change',
      payload: INITIAL_PRODUCT_STATE.image,
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
    dispatch(updateProductAction({
      product: state,
      productId: product?.id as string,
      setFormSubmitStateCb: (status) => setFormStatus(status)}));
    navigate(PageRouteEnum.Products);
  }

  useEffect( () => {
    dispatch(fetchActiveAction(params.id as string));
    if (product !== null) {
      reducerDispatch({
        type: 'full-change',
        payload: product,
      });
    }
  }, [product?.id]);

  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">{state.name}</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><Link to={PageRouteEnum.SignIn} className="link">Вход</Link>
            </li>
            <li className="breadcrumbs__item"><Link to={PageRouteEnum.Products} className="link">Товары</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link">{state.name}</a>
            </li>
          </ul>
          <form className="add-item__form" onSubmit={handleSubmit}>
            <div className="add-item__form-left">
              <div className="edit-item-image add-item__form-image">
                <div className="edit-item-image__image-wrap">
                  <img className="edit-item-image__image" src={`${BASE_URL}/uploads/${state.image}`}
                    srcSet={`${BASE_URL}/uploads/${state.image}`} width="133" height="332" alt={state.name}
                  />
                </div>
                <div className="edit-item-image__btn-wrap">
                  <button onClick={handleImageChange} className="button button--small button--black-border edit-item-image__btn">
                    Заменить
                  </button>
                  <button onClick={handleImageDeletion} className="button button--small button--black-border edit-item-image__btn">
                    Удалить
                  </button>
                </div>
              </div>
              <div className="input-radio add-item__form-radio"><span>Тип товара</span>
                {
                  Object.values(AvailableGuitarTypesEnum).map((guitarType) => (
                    <React.Fragment key={`fragment-${guitarType}`}>
                      <input key={`${guitarType}-input`} type="radio" id={`${guitarType} type`} name="item-type" value={guitarType}
                        checked={state.type === guitarType}
                        onChange={handleTypeChange}
                        disabled={!allowedFilterOptions.type.includes(guitarType)}
                      /><label key={`${guitarType}-label`} htmlFor={`${guitarType} type`}>{GUITAR_TYPES_NAMES[guitarType]}</label>
                    </React.Fragment>))
                }
              </div>
              <div className="input-radio add-item__form-radio"><span>Количество струн</span>
                {
                  Object.values(AvailableGuitarStringsEnum).filter((value) => !isNaN(Number(value)))
                    .map((guitarStrings) => (
                      <React.Fragment key={`fragment-${guitarStrings}`}>
                        <input key={`${guitarStrings}-strings-input`} type="radio" id={`string-qty-${guitarStrings}`} name="string-qty" value={guitarStrings}
                          checked={state.strings === guitarStrings}
                          onChange={handleStringsChange}
                          disabled={!allowedFilterOptions.strings.includes(Number(guitarStrings))}
                        /><label key={`${guitarStrings}-strings-label`} htmlFor={`string-qty-${guitarStrings}`}>{guitarStrings}</label>
                      </React.Fragment>
                    ))
                }
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
                <label><span>Наименование товара</span>
                  <input type="text" name="title" value={state.name} onChange={handleNameChange} placeholder="Наименование"/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                <label><span>Цена товара</span>
                  <input type="text" name="price" value={state.price} onChange={handlePriceChange} placeholder="Цена"/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-input add-item__form-input">
                <label><span>Артикул товара</span>
                  <input type="text" name="sku" value={state.vendorCode} onChange={handleVendorCodeChange} placeholder="Артикул товара"/>
                </label>
                <p>Заполните поле</p>
              </div>
              <div className="custom-textarea add-item__form-textarea">
                <label><span>Описание товара</span>
                  <textarea name="description" placeholder="" onInput={handleDescriptionChange} value={state.description}></textarea>
                </label>
                <p>Заполните поле</p>
              </div>
            </div>
            <div className="add-item__form-buttons-wrap">
              <button className="button button--small add-item__form-button" type="submit" disabled={formStatus === FormStatusEnum.Disabled}>
                Сохранить изменения
              </button>
              <button onClick={() => navigate(PageRouteEnum.Products)} className="button button--small add-item__form-button" type="button">
                Вернуться к списку товаров
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
