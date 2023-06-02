import { SortType } from "../../../types/sort-type.enum.js";
import { Transform } from "class-transformer";
import { IsEnum, IsIn, IsOptional } from "class-validator";
import { GuitarTypeEnum } from "../../../types/guitar-type.enum.js";
import { GetOffersQueryType } from "../../../types/get-offers-query.type.js";

export const DEFAULT_SORT_DIRECTION = SortType.Up;
export const DEFAULT_SORT_BY = 'price'
export const GUITAR_ALLOWED_STRINGS_QUANTITIES = [4, 6, 7, 12]

export class GetOffersQuery {
  @IsEnum(GuitarTypeEnum)
  @IsOptional()
  public type?: string[];

  @Transform(({ value }) => +value)
  @IsIn(GUITAR_ALLOWED_STRINGS_QUANTITIES)
  @IsOptional()
  public strings?: number[];

  @IsIn(['postedDate', 'price'])
  @IsOptional()
  public sortBy: string = DEFAULT_SORT_BY;

  @IsIn([-1, 1])
  @IsOptional()
  public sortDirection: number = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number = 1 as 1;

  public fill(object: GetOffersQueryType) {
    this.type = object.type ?? this.type;
    this.strings = object.strings?.map((value) => Number(value)) ?? this.strings;
    this.sortBy = object.sortBy ?? this.sortBy;
    this.sortDirection = Number(object.sortDirection) as (-1 | 1) ?? this.sortDirection;
    this.page = Number(object.page) ?? this.page;
  }
}
