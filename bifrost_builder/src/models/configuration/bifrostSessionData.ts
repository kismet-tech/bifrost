/* eslint-disable @typescript-eslint/no-explicit-any */
export type BifrostSessionDataKey = string;
export type BifrostSessionDataValue = any;

export interface BifrostSessionData {
  [key: BifrostSessionDataKey]: BifrostSessionDataValue;
}
