import { SortByEnum } from '../../const/sort-by.enum';
import { SortDirectionEnum } from '../../const/sort-direction.enum';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/store-hooks';
import { changeSortingAction } from '../../store/products/actions';

const INITIAL_SORTING_STATE = {
  by: SortByEnum.Price as string,
  direction: SortDirectionEnum.Up as number,
};

export default function Sorting(): JSX.Element {
  const [sortingState, setSortingState] = useState(INITIAL_SORTING_STATE);
  const dispatch = useAppDispatch();

  function handleSortByChange(sortBy: SortByEnum) {
    setSortingState(
      { ...sortingState, by: sortBy }
    );
    dispatch(changeSortingAction(sortingState));
  }
  function handleSortDirectionChange(sortDirection: SortDirectionEnum) {
    setSortingState(
      { ...sortingState, direction: sortDirection }
    );
    dispatch(changeSortingAction(sortingState));
  }

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${sortingState.by === SortByEnum.Price ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          onClick={() => handleSortByChange(SortByEnum.Price)}
        >по цене
        </button>
        <button className={`catalog-sort__type-button ${sortingState.by === SortByEnum.PostedDate ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по дате"
          onClick={() => handleSortByChange(SortByEnum.PostedDate)}
        >по дате
        </button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button catalog-sort__order-button--up ${sortingState.direction === SortDirectionEnum.Up ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          onClick={() => handleSortDirectionChange(SortDirectionEnum.Up)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${sortingState.direction === SortDirectionEnum.Down ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={() => handleSortDirectionChange(SortDirectionEnum.Down)}
        >
        </button>
      </div>
    </div>
  );
}
