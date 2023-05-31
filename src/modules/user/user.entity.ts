import { SafeUserType, UserType } from "../../types/user.type.js";
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements SafeUserType {
  constructor(data: UserType) {
    super();
    this.email = data.email;
    this.name = data.name;
    this.hasAdminRights = data.hasAdminRights;
  }

  @prop({unique: true, required: true})
  public email!: string;

  @prop({required: true, default: ''})
  public name!: string;

  @prop({default: false})
  public hasAdminRights!: boolean;

  @prop({required: true})
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
