import { ProductType } from '../../types/product.type';
import ProductCard from '../product-card/product-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getProductsData } from '../../store/products/selectors';
import { useEffect } from 'react';
import { fetchProductsDataAction } from '../../store/api-actions';


export default function ProductList(): JSX.Element {
  const products = useAppSelector(getProductsData).products;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsDataAction());
  }, []);

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
