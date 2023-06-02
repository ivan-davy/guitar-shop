import { useState } from 'react';
import { useAppDispatch } from '../../hooks/store-hooks';
import {
  AvailableGuitarStringsEnum,
  AvailableGuitarTypesEnum,
  GUITAR_TYPES_NAMES
} from '../../const/available-products.enum';
import { changeFiltersAction } from '../../store/products/actions';

const INITIAL_FILTERS_STATE = {
  type: [] as string[],
  strings: [] as number[],
};

export default function Filters(): JSX.Element {
  const [filtersState, setFiltersState] = useState(INITIAL_FILTERS_STATE);
  const dispatch = useAppDispatch();

  function handleTypeChange(pressedOption: string) {
    let currentTypes = [...filtersState.type];
    if (!currentTypes.includes(pressedOption)) {
      currentTypes.push(pressedOption);
    } else {
      currentTypes = currentTypes.filter((type) => type !== pressedOption);
    }
    setFiltersState({
      ...filtersState, type: currentTypes,
    });
    dispatch(changeFiltersAction({
      ...filtersState, type: currentTypes,
    }));
  }
  function handleStringsChange(pressedOption: number) {
    let currentStrings = [...filtersState.strings];
    if (!currentStrings.includes(pressedOption)) {
      currentStrings.push(pressedOption);
    } else {
      currentStrings = currentStrings.filter((strings) => strings !== pressedOption);
    }
    setFiltersState({
      ...filtersState, strings: currentStrings,
    });
    dispatch(changeFiltersAction({
      ...filtersState, strings: currentStrings,
    }));
  }

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          Object.values(AvailableGuitarTypesEnum).map((guitarType) => (
            <div className="form-checkbox catalog-filter__block-item" key={guitarType}>
              <input className="visually-hidden" type="checkbox"
                id={guitarType}
                name={guitarType}
                onClick={(event) => handleTypeChange(guitarType)}
                checked={filtersState.type.includes(guitarType)}
                onChange={(event) => null }
              />
              <label htmlFor={guitarType}>{GUITAR_TYPES_NAMES[guitarType]}</label>
            </div>))
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          Object.values(AvailableGuitarStringsEnum).filter((value) => !isNaN(Number(value)))
            .map((guitarStrings) => (
              <div className="form-checkbox catalog-filter__block-item" key={guitarStrings}>
                <input className="visually-hidden" type="checkbox"
                  id={guitarStrings.toString()}
                  name={guitarStrings.toString()}
                  onClick={(event) => handleStringsChange(Number(guitarStrings))}
                  checked={filtersState.strings.includes(Number(guitarStrings))}
                  onChange={(event) => null }
                />
                <label htmlFor={guitarStrings.toString()}>{guitarStrings}</label>
              </div>))
        }
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset" onClick={() => setFiltersState(INITIAL_FILTERS_STATE)}
      >
        Очистить
      </button>
    </form>
  );
}
