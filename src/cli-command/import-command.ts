import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import {createOffer, getErrorMessage} from '../utils/common.js';
import DatabaseService from '../common/database-client/database.service.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import {getURI} from '../utils/db.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import {OfferServiceInterface} from '../modules/offer/offer-service.interface.js';
import UserService from '../modules/user/user.service.js';
import OfferService from '../modules/offer/offer.service.js';
import {OfferModel} from '../modules/offer/offer.entity.js';
import {UserModel} from '../modules/user/user.entity.js';
import {CreateOfferType} from '../types/offer.type.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {CommentServiceInterface} from '../modules/comment/comment-service.interface';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private commentService!: CommentServiceInterface;
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.userService = new UserService(this.logger, UserModel);
    this.offerService = new OfferService(this.logger, OfferModel, this.userService, this.commentService);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(offer: CreateOfferType) {
    const pwd = offer.user.password ? offer.user.password : DEFAULT_USER_PASSWORD;
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: pwd
    }, this.salt);

    await this.offerService.create({
      ...offer,
      user: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    console.log(offer);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}