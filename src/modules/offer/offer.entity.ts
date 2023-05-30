import typegoose, {defaultClasses, getModelForClass} from '@typegoose/typegoose';
import {OfferType} from '../../types/offer.type.js';
import {GuitarTypeEnum} from '../../types/guitar-type.enum';
import dayjs from "dayjs";

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
  })
  public name!: string;

  @prop({
    trim: true,
    required: true,
  })
  public description!: string;

  @prop({
    required: true,
    default: dayjs().toDate() //TODO: possibly a type error
  })
  public postedDate!: Date;

  @prop({
    default: '',
    required: true,
  })
  public image!: string;

  @prop({
    required: true,
  })
  public strings!: number;

  @prop({
    required: true,
  })
  public vendorCode!: string;

  @prop({
    required: true,
    type: () => String,
    enum: GuitarTypeEnum
  })
  public type!: OfferType;

  @prop({
    required: true,
  })
  public price!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
