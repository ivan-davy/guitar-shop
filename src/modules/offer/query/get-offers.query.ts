import { SortType } from "../../../types/sort-type.enum.js";
import { Transform } from "class-transformer";
import { IsEnum, IsIn, IsNumber, IsOptional } from "class-validator";
import { GuitarTypeEnum } from "../../../types/guitar-type.enum.js";

export const DEFAULT_SORT_DIRECTION = SortType.Down;
export const DEFAULT_OFFER_QTY = 7;
export const DEFAULT_SORT_BY = 'postedDate'
export const GUITAR_ALLOWED_STRINGS_QUANTITIES = [4, 6, 7, 12]

export class GetOffersQuery {
  @Transform(({ value }) => +value || DEFAULT_OFFER_QTY)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_OFFER_QTY;

  @Transform(({ value }) => value.toLowerCase())
  @IsEnum(GuitarTypeEnum)
  @IsOptional()
  public type?: string;

  @Transform(({ value }) => +value)
  @IsIn(GUITAR_ALLOWED_STRINGS_QUANTITIES)
  @IsOptional()
  public strings?: string;

  @IsIn(['postedDate', 'price'])
  @IsOptional()
  public sortBy: 'postedDate' | 'price' = DEFAULT_SORT_BY;

  @IsIn([-1, 1])
  @IsOptional()
  public sortDirection: -1 | 1 = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number = 1;
}
