/* tslint:disable */
/* eslint-disable */
/**
 * Kismet Backend
 * Kismet Backend API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { EitherResponseType } from './either-response-type';
// May contain unused imports in some cases
// @ts-ignore
import type { UpdateBifrostItineraryOfferSuccessResponseDataDto } from './update-bifrost-itinerary-offer-success-response-data-dto';

/**
 * 
 * @export
 * @interface UpdateBifrostItineraryOfferSuccessResponseDto
 */
export interface UpdateBifrostItineraryOfferSuccessResponseDto {
    /**
     * 
     * @type {EitherResponseType}
     * @memberof UpdateBifrostItineraryOfferSuccessResponseDto
     */
    'type': EitherResponseType;
    /**
     * 
     * @type {UpdateBifrostItineraryOfferSuccessResponseDataDto}
     * @memberof UpdateBifrostItineraryOfferSuccessResponseDto
     */
    'success': UpdateBifrostItineraryOfferSuccessResponseDataDto;
}



