import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getTotalProductQty } from '../../store/products/selectors';
import { SyntheticEvent, useState } from 'react';
import { nToMArray } from '../../util/n-to-m-array';
import { changeCurrentPageAction } from '../../store/products/actions';

const INITIAL_CURRENT_PAGE = 1;
const MAX_PAGES_AHEAD = 4;
const PRODUCTS_PER_PAGE = 7;
const NEXT_BUTTON_THRESHOLD = 3;

export default function PageSelector(): JSX.Element {
  const totalProductQty = useAppSelector(getTotalProductQty);
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const topBoundary = Math.min(Math.ceil((totalProductQty / PRODUCTS_PER_PAGE)), currentPage + MAX_PAGES_AHEAD);
  const bottomBoundary =
    Math.min(
      currentPage - 1 > 0 ? currentPage - 1 : 1,
      Math.max(topBoundary - (MAX_PAGES_AHEAD + 1), 1)
    );
  const dispatch = useAppDispatch();

  if (currentPage > topBoundary && topBoundary !== 0) {
    setCurrentPage(1);
  }

  function handleNextPage(evt: SyntheticEvent) {
    evt.preventDefault();
    setCurrentPage(currentPage + 1);
    dispatch(changeCurrentPageAction(currentPage + 1));
  }

  function handlePageClick(evt: SyntheticEvent, pageNumber: number) {
    evt.preventDefault();
    setCurrentPage(pageNumber);
    dispatch(changeCurrentPageAction(pageNumber));
  }

  return (
    <ul className="pagination__list">
      {
        nToMArray(bottomBoundary, topBoundary).map((number) => (
          <li className={`pagination__page ${currentPage === number ? 'pagination__page--active' : ''}`} key={`page-${number}`}>
            <a className="link pagination__page-link"
              href={number.toString()}
              onClick={(event) => handlePageClick(event, number)}
            >{number}
            </a>
          </li>
        ))
      }
      { (totalProductQty / PRODUCTS_PER_PAGE) < NEXT_BUTTON_THRESHOLD || currentPage === Math.ceil(totalProductQty / PRODUCTS_PER_PAGE) ?
        '' :
        (
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link"
              onClick={handleNextPage}
            >
            Далее
            </a>
          </li>
        )}
    </ul>
  );
}
