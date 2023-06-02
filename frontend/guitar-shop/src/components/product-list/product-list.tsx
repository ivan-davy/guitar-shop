import { ProductType } from '../../types/product.type';
import ProductCard from '../product-card/product-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getProductsData } from '../../store/products/selectors';
import { useEffect, useState } from 'react';
import { fetchProductsAction } from '../../store/api-actions';

const PRODUCTS_INIT_STATE = {
  products: [] as ProductType[],
  totalProductQty: 0,
};

export default function ProductList(): JSX.Element {
  const productsData = useAppSelector(getProductsData);
  const dispatch = useAppDispatch();
  const [productsState, setProductsState] = useState(PRODUCTS_INIT_STATE);

  // eslint-disable-next-line no-console
  console.log(productsState, productsData);

  useEffect(() => {
    dispatch(fetchProductsAction());
    setProductsState(productsData);
  }, []);

  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {
          productsData.products ?
            productsData.products.map((product: ProductType) => (
              <ProductCard
                key={`${product.id as string}-key`}
                id={product.id as string}
                name={product.name}
                postedDate={product.postedDate}
                image={product.image}
                price={product.price}
              />
            )) : null
        }
      </ul>
    </div>
  );
}
