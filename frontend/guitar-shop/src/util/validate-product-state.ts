import { ProductType } from '../types/product.type';
import Joi from 'joi';
import { AllowedImageFormatsEnum } from '../const/allowed-image-formats.enum';
import { AvailableGuitarStringsEnum, AvailableGuitarTypesEnum } from '../const/available-products';

export function validateProductState(state: ProductType) {
  const schema = Joi.object({
    name: Joi.string()
      .min(10)
      .max(100)
      .required(),
    description: Joi.string()
      .min(20)
      .max(1024)
      .required(),
    postedDate: Joi.string()
      .isoDate()
      .required(),
    image: Joi.string()
      .custom((value: string) =>
        value.endsWith(AllowedImageFormatsEnum.JPG) ||
        value.endsWith(AllowedImageFormatsEnum.PNG))
      .required(),
    type: Joi.string()
      .valid(...Object.values(AvailableGuitarTypesEnum))
      .required(),
    vendorCode: Joi.string()
      .min(5)
      .max(40)
      .required(),
    strings: Joi.number()
      .integer()
      .valid(...Object.values(AvailableGuitarStringsEnum))
      .required(),
    price: Joi.number()
      .integer()
      .min(100)
      .max(1000000)
      .required(),
    id: Joi.string()
      .optional()
  });

  return schema.validate(state);
}
