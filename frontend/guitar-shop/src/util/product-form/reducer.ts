import { ProductType } from '../../types/product.type';

export function reducer(state: ProductType, action: { type: string; payload: string | number | ProductType }): ProductType {
  switch (action.type) {
    case 'name-change': {
      return {
        ...state,
        name: action.payload as string
      } as ProductType;
    }
    case 'price-change': {
      return {
        ...state,
        price: action.payload as number
      } as ProductType;
    }
    case 'vendor-code-change': {
      return {
        ...state,
        vendorCode: action.payload as string
      } as ProductType;
    }
    case 'description-change': {
      return {
        ...state,
        description: action.payload as string
      } as ProductType;
    }
    case 'type-change': {
      return {
        ...state,
        type: action.payload as string
      } as ProductType;
    }
    case 'strings-change': {
      return {
        ...state,
        strings: action.payload as number
      } as ProductType;
    }
    case 'full-change': {
      return action.payload as ProductType;
    }
  }
  throw Error(`Unknown action: ${action.type}`);
}


