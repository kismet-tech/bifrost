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
import type { DetermineIfBifrostTravelerRequiresAnEventSpaceSuccessResponseDataDto } from './determine-if-bifrost-traveler-requires-an-event-space-success-response-data-dto';
// May contain unused imports in some cases
// @ts-ignore
import type { EitherResponseType } from './either-response-type';

/**
 * 
 * @export
 * @interface DetermineIfBifrostTravelerRequiresAnEventSpaceSuccessResponseDto
 */
export interface DetermineIfBifrostTravelerRequiresAnEventSpaceSuccessResponseDto {
    /**
     * 
     * @type {EitherResponseType}
     * @memberof DetermineIfBifrostTravelerRequiresAnEventSpaceSuccessResponseDto
     */
    'type': EitherResponseType;
    /**
     * 
     * @type {DetermineIfBifrostTravelerRequiresAnEventSpaceSuccessResponseDataDto}
     * @memberof DetermineIfBifrostTravelerRequiresAnEventSpaceSuccessResponseDto
     */
    'success': DetermineIfBifrostTravelerRequiresAnEventSpaceSuccessResponseDataDto;
}



