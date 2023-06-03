import { ProductType } from '../../types/product.type';
import dayjs from 'dayjs';
import { AvailableGuitarStringsEnum, AvailableGuitarTypesEnum } from '../../const/available-products.enum';

export const INITIAL_PRODUCT_STATE: ProductType = {
  name: '',
  description: '',
  postedDate: dayjs().toISOString(),
  price: 0,
  vendorCode: '',
  image: 'placeholder-guitar-image.png',
  type: AvailableGuitarTypesEnum.Acoustic,
  strings: AvailableGuitarStringsEnum.Six
};
