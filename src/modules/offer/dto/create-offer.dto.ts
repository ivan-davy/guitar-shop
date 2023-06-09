import {
  IsDateString, IsEnum, IsIn, IsInt, IsOptional, IsString, Max,
  MaxLength, Min, MinLength, Validate
} from "class-validator";
import {GuitarTypeEnum} from '../../../types/guitar-type.enum.js';
import {ValidImageFormat} from '../../../common/middlewares/validators/valid-image-format.validator.js';
import { GUITAR_ALLOWED_STRINGS_QUANTITIES } from "../query/get-offers.query.js";

export default class CreateOfferDto {
  @IsString({message: '$property must be a string'})
  @MinLength(10, {message: 'Minimum $property length must be $constraint1'})
  @MaxLength(100, {message: 'Maximum $property length must be $constraint1'})
  public name!: string;

  @IsString({message: '$property must be a string'})
  @MinLength(20, {message: 'Minimum $property length must be $constraint1'})
  @MaxLength(1024, {message: 'Maximum $property length must be $constraint1'})
  public description!: string;

  @IsOptional()
  @IsDateString({}, {message: '$property must be a valid ISO date'})
  public postedDate!: string;

  @IsString({message: '$property must be a string', each: true})
  @Validate(ValidImageFormat)
  public image!: string;

  @IsEnum(GuitarTypeEnum, {message: '$property should be a value from TypeEnum'})
  public type!: string;

  @IsInt({message: '$property must be an integer'})
  @IsIn(GUITAR_ALLOWED_STRINGS_QUANTITIES)
  public strings!: number;

  @IsString({message: '$property must be a string'})
  @MinLength(5, {message: 'Minimum $property length must be $constraint1'})
  @MaxLength(40, {message: 'Maximum $property length must be $constraint1'})
  public vendorCode!: string;

  @IsInt({message: '$property must be an integer'})
  @Min(100, {message: '$property must be an integer value no less than $constraint1'})
  @Max(1000000, {message: '$property must be an integer value no more than $constraint1'})
  public price!: number;
}
