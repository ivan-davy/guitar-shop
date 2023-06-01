import { ProductType } from '../../types/product.type';
import ProductCard from '../product-card/product-card';

type ProductListPropType = {
  items: ProductType[];
}

export default function ProductList({items}: ProductListPropType): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {items.map((product: ProductType) => (
          <ProductCard
            key={`${product.id as string}-key`}
            id={product.id as string}
            name={product.name}
            postedDate={product.postedDate}
            image={product.image}
            price={product.price}
          />
        ))}
      </ul>
    </div>
  );
}
