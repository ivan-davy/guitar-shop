import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {UserEntity} from './user.entity.js';
import CreateUserDto from './dto/create-user.dto.js';
import {UserServiceInterface} from './user-service.interface.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {Component} from '../../types/component.types.js';
import LoginUserDto from './dto/login-user.dto.js';
import mongoose from 'mongoose';
import {OfferEntity} from '../offer/offer.entity.js';
import {DEFAULT_AVATAR_FILE_NAME} from './user.constant.js';
import UpdateUserDto from './dto/update-user.dto.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const avtPath = dto.avatarPath ? dto.avatarPath : DEFAULT_AVATAR_FILE_NAME;
    const user = new UserEntity({...dto, favorites: [], avatarPath: avtPath});
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({'_id': userId});
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, {new: true})
      .exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (!user) {
      return null;
    }

    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }

    return null;
  }

  public async addToFavoritesById(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.userModel
      .findOneAndUpdate(
        { '_id': userId },
        {
          $addToSet: { 'favorites': new mongoose.Types.ObjectId(offerId) }
        },
        { new: true, upsert: true });
  }

  public async removeFromFavoritesById(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.userModel
      .findOneAndUpdate(
        { '_id': userId },
        {
          $pull: { 'favorites': new mongoose.Types.ObjectId(offerId) }
        },
        { new: true });
  }
}
