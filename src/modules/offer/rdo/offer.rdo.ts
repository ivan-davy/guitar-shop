import {Expose} from 'class-transformer';


export default class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postedDate!: Date;

  @Expose()
  public image!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public type!: string;

  @Expose()
  public strings!: number;

  @Expose()
  public vendorCode!: string;

  @Expose()
  public price!: number;
}
