import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';
import { GetOffersQuery } from "./query/get-offers.query.js";
import { OffersReturnType } from "../../types/offers-return.type";

export interface OfferServiceInterface extends DocumentExistsInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity>[]>;
  find(query: GetOffersQuery): Promise<OffersReturnType>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity>[] | null>;
  exists(documentId: string): Promise<boolean>;
}
