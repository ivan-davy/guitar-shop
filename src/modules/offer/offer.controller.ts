import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {OfferServiceInterface} from './offer-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import OfferRdo from './rdo/offer.rdo.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import HttpError from '../../common/errors/http-error.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file.middleware.js';
import UploadImagePreviewResponse from './rdo/upload-image.rdo.js';
import { GetOffersQuery } from "./query/get-offers.query.js";
import { AdminRouteMiddleware } from "../../common/middlewares/admin-route.middleware.js";

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger, configService);
    this.logger.info('Registering routes for OfferController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.find
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new AdminRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.findById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.updateById,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteById,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async find(req: Request, res: Response): Promise<void> {
    const query = new GetOffersQuery();
    query.fill(req.query);
    const offersData = await this.offerService.find(query);
    const responseData = fillDTO(OfferRdo, offersData.offers);
    this.send(res, StatusCodes.OK, { offers: responseData, totalOfferQty: offersData.totalOfferQty});
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(req.body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferRdo, result)
    );
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findById(req.params.offerId);
    if (offers?.length === 0) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController'
      );
    }
    const offerResponse = fillDTO(OfferRdo, offers[0]);
    this.ok(res, offerResponse);
  }

  public async updateById({params, body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response): Promise<void> {
    const result = await this.offerService.updateById(params.offerId as string, body);
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }
    this.send(
      res,
      StatusCodes.OK,
      fillDTO(OfferRdo, result)
    );
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.deleteById(req.params.offerId as string);
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController'
      );
    }
    this.ok(res, {});
  }

  public async uploadImage(req: Request, res: Response) {
    const updateDto = { image: req.file?.filename };
    await this.offerService.updateById(req.params.offerId, updateDto);
    this.created(res, fillDTO(UploadImagePreviewResponse, {updateDto}));
  }
}
