import { UserType } from "./user.type";

export type OfferType = {
  name: string;
  description: string;
  postedDate: string;
  image: string;
  type: string;
  vendorCode: string;
  strings: number;
  price: number;
}

export type ImportDataType = {
  name: string;
  description: string;
  postedDate: string;
  image: string;
  type: string;
  vendorCode: string;
  strings: number;
  price: number;
  user: UserType
}
