import { OfferType } from "./offer.type";

export type OffersReturnType = {
  offers: OfferType[] | null;
  totalOfferQty: number | null;
}
