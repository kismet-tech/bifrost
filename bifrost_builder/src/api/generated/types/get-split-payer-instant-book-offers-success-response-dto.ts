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
import type { GetSplitPayerInstantBookOffersSuccessResponseDataDto } from './get-split-payer-instant-book-offers-success-response-data-dto';

/**
 * 
 * @export
 * @interface GetSplitPayerInstantBookOffersSuccessResponseDto
 */
export interface GetSplitPayerInstantBookOffersSuccessResponseDto {
    /**
     * 
     * @type {EitherResponseType}
     * @memberof GetSplitPayerInstantBookOffersSuccessResponseDto
     */
    'type': EitherResponseType;
    /**
     * 
     * @type {GetSplitPayerInstantBookOffersSuccessResponseDataDto}
     * @memberof GetSplitPayerInstantBookOffersSuccessResponseDto
     */
    'success': GetSplitPayerInstantBookOffersSuccessResponseDataDto;
}



