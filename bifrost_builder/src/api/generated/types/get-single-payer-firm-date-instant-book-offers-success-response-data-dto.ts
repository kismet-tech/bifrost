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
import type { RenderableBifrostInstantBookOffer } from './renderable-bifrost-instant-book-offer';

/**
 * 
 * @export
 * @interface GetSinglePayerFirmDateInstantBookOffersSuccessResponseDataDto
 */
export interface GetSinglePayerFirmDateInstantBookOffersSuccessResponseDataDto {
    /**
     * 
     * @type {string}
     * @memberof GetSinglePayerFirmDateInstantBookOffersSuccessResponseDataDto
     */
    'userSessionId': string;
    /**
     * 
     * @type {Array<RenderableBifrostInstantBookOffer>}
     * @memberof GetSinglePayerFirmDateInstantBookOffersSuccessResponseDataDto
     */
    'instantBookOffers': Array<RenderableBifrostInstantBookOffer>;
}

