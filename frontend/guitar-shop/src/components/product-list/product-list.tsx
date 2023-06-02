import { ProductType } from '../../types/product.type';
import ProductCard from '../product-card/product-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getFilters, getProducts, getSorting } from '../../store/products/selectors';
import { useEffect } from 'react';
import { fetchProductsDataAction } from '../../store/api-actions';


export default function ProductList(): JSX.Element {
  const products = useAppSelector(getProducts);
  const filters = useAppSelector(getFilters);
  const sorting = useAppSelector(getSorting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsDataAction());
  }, [filters, sorting]);

  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {
          products.map((product: ProductType) => (
            <ProductCard
              key={`${product.id as string}-key`}
              id={product.id as string}
              name={product.name}
              postedDate={product.postedDate}
              image={product.image}
              price={product.price}
            />
          ))
        }
      </ul>
    </div>
  );
}
