import { inject, injectable } from "inversify";
import { OfferServiceInterface } from "./offer-service.interface.js";
import CreateOfferDto from "./dto/create-offer.dto.js";
import { DocumentType, types } from "@typegoose/typegoose";
import { OfferEntity } from "./offer.entity.js";
import { Component } from "../../types/component.types.js";
import { LoggerInterface } from "../../common/logger/logger.interface.js";
import UpdateOfferDto from "./dto/update-offer.dto.js";
import mongoose from "mongoose";
import { GetOffersQuery } from "./query/get-offers.query.js";
import { DEFAULT_OFFERS_PER_PAGE } from "./offer.const.js";
import { OffersReturnType } from "../../types/offers-return.type";
import { OfferType } from "../../types/offer.type";


@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${result.name}, ${result._id}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        {
          $match: { '_id': new mongoose.Types.ObjectId(offerId) },
        },
        { $addFields: { id: {$toString: '$_id' } } }
      ]).exec();
  }

  public async find(query: GetOffersQuery): Promise<OffersReturnType> {
    const findObj = {
      type: query.type,
      strings: query.strings
    };
    if (!findObj.type) {
      delete findObj.type;
    }
    if (!findObj.strings) {
      delete findObj.strings;
    }
    console.log(query);

    const totalOfferQty = (await this.offerModel
      .find(findObj).exec()).length

    const offers = (await this.offerModel
      .find(findObj)
      .sort({ [query.sortBy as string]: query.sortDirection as (-1 | 1) })
      .limit(DEFAULT_OFFERS_PER_PAGE * (query.page ?? 1))
      .skip(DEFAULT_OFFERS_PER_PAGE * ((query.page ?? 1) - 1))
      .exec())
      .map((offer) => ({...offer.toObject(), postedDate: offer.postedDate.toISOString()}))
    return { totalOfferQty, offers: offers as OfferType[] };
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity>[] | null> {
    const documentExists = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true});
    if (!documentExists) {
      return null;
    }
    return this.offerModel
      .aggregate([
        {
          $match: { '_id': new mongoose.Types.ObjectId(offerId) },
        },
        { $addFields: { id: {$toString: '$_id' } } }
      ]).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
