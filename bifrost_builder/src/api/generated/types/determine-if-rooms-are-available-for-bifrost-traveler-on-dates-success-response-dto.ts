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
import type { DetermineIfRoomsAreAvailableForBifrostTravelerOnDatesSuccessResponseDataDto } from './determine-if-rooms-are-available-for-bifrost-traveler-on-dates-success-response-data-dto';
// May contain unused imports in some cases
// @ts-ignore
import type { EitherResponseType } from './either-response-type';

/**
 * 
 * @export
 * @interface DetermineIfRoomsAreAvailableForBifrostTravelerOnDatesSuccessResponseDto
 */
export interface DetermineIfRoomsAreAvailableForBifrostTravelerOnDatesSuccessResponseDto {
    /**
     * 
     * @type {EitherResponseType}
     * @memberof DetermineIfRoomsAreAvailableForBifrostTravelerOnDatesSuccessResponseDto
     */
    'type': EitherResponseType;
    /**
     * 
     * @type {DetermineIfRoomsAreAvailableForBifrostTravelerOnDatesSuccessResponseDataDto}
     * @memberof DetermineIfRoomsAreAvailableForBifrostTravelerOnDatesSuccessResponseDto
     */
    'success': DetermineIfRoomsAreAvailableForBifrostTravelerOnDatesSuccessResponseDataDto;
}



