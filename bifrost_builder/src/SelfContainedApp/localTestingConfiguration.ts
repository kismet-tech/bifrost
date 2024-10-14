import { knollcroftBusinessEventSpaceScreenConfiguration } from "@/getBifrostConfiguration/knollcroftV1Screens/business/knollcroftBusinessEventSpaceScreenConfiguration";
import { BifrostConfiguration } from "@/models/configuration";

export const localTestingConfiguration: BifrostConfiguration = {
  hotelId: "testing",
  bifrostFormId: "testing-1",
  rootScreenConfiguration: knollcroftBusinessEventSpaceScreenConfiguration,
};
