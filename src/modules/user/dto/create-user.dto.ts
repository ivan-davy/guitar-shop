import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export default class CreateUserDto {
  @IsEmail({}, {message: '$property is not valid email address.'})
  public email!: string;

  @IsString({message: '$property must be a valid string'})
  @MinLength(1, {message: '$property must be at least $constraint1 symbol long'})
  @MaxLength(15, {message: '$property must be no longer than $constraint1 symbols'})
  public name!: string;

  @IsString({message: '$property must be a valid string'})
  @MinLength(6, {message: '$property must be at least $constraint1 symbols long'})
  @MaxLength(12, {message: '$property must be no longer than $constraint1 symbols'})
  public password!: string;

  @IsBoolean({message: '$property must be a boolean'})
  public hasAdminRights!: boolean;
}
