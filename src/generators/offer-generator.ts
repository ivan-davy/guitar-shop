import {MockDataType} from '../types/mock-data.type';
import {getRandomInteger, getRandomItem} from '../utils/random.js';
import {GeneratorInterface} from '../types/generator.interface';

const PRICE_RANGE = [100, 1000000];
const STRINGS_QUANTITIES = [4, 6, 7, 12]


export default class OfferGenerator implements GeneratorInterface {
  constructor(private readonly mockData: MockDataType) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postedDate = getRandomItem<string>(this.mockData.postedDates);
    const image = getRandomItem<string>(this.mockData.images);
    const type = getRandomItem<string>(this.mockData.types);
    const strings = getRandomItem(STRINGS_QUANTITIES);
    const vendorCode = getRandomItem(this.mockData.vendorCodes)
    const price = getRandomInteger(PRICE_RANGE[0], PRICE_RANGE[1]);
    const userName = this.mockData.rootUser.name;
    const hasAdminRights = this.mockData.rootUser.hasAdminRights;
    const email = this.mockData.rootUser.email;
    const password = this.mockData.rootUser.password

    return [
      name,
      description,
      postedDate,
      image,
      type,
      price,
      strings,
      vendorCode,
      userName,
      email,
      password,
      hasAdminRights
    ]
      .join('\t');
  }
}
