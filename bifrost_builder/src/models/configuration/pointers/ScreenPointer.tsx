import { FormQuestionId } from "@/models/formQuestions/questionWithResponse";
import { ScreenConfiguration } from "..";

export enum ScreenPointerType {
  DIRECT = "DIRECT",
  BACK = "BACK",
  BRANCH_BY_EVENT_SPACE_REQUIREMENT = "BRANCH_BY_EVENT_SPACE_REQUIREMENT",
  BRANCH_BY_ROOM_AVAILABILITY_ON_DATES = "BRANCH_BY_ROOM_AVAILABILITY_ON_DATES",
  SUBMIT_FORM_AND_BRANCH_BY_INSTANT_OFFER_AVAILABILITY = "BRANCH_BY_INSTANT_OFFER_AVAILABILITY",
}

export interface BaseScreenPointer {
  type: ScreenPointerType;
}

export interface DirectScreenPointer {
  type: ScreenPointerType.DIRECT;
  screenConfiguration: ScreenConfiguration;
}

export interface BackScreenPointer {
  type: ScreenPointerType.BACK;
}

export interface BranchByEventSpaceRequirementScreenPointer {
  type: ScreenPointerType.BRANCH_BY_EVENT_SPACE_REQUIREMENT;

  eventSpaceIsRequiredScreenConfiguration: ScreenConfiguration;
  eventSpaceIsNotRequiredScreenConfiguration: ScreenConfiguration;
}

export interface BranchByRoomAvailabilityOnDatesScreenPointer {
  type: ScreenPointerType.BRANCH_BY_ROOM_AVAILABILITY_ON_DATES;

  calendarDataFormQuestionId: FormQuestionId;
  alternativeCalendarDataFormQuestionId: FormQuestionId;

  roomsAreAvailableScreenConfiguration: ScreenConfiguration;
  roomsAreNotAvailableButAlternativesAreAvailableScreenConfiguration: ScreenConfiguration;
  roomsAreNotAvailableAndAlternativesAreNotAvailableScreenConfiguration: ScreenConfiguration;
}

export interface SubmitFormAndBranchByInstantOfferAvailabilityScreenPointer {
  type: ScreenPointerType.SUBMIT_FORM_AND_BRANCH_BY_INSTANT_OFFER_AVAILABILITY;

  instantOfferIsAvailableScreenConfiguration: ScreenConfiguration;
  instantOfferIsNotAvailableScreenConfiguration: ScreenConfiguration;
}

export interface SubmitFormAndBranchByInstantOfferAvailabilityScreenPointer {
  type: ScreenPointerType.SUBMIT_FORM_AND_BRANCH_BY_INSTANT_OFFER_AVAILABILITY;

  instantOfferIsAvailableScreenConfiguration: ScreenConfiguration;
  instantOfferIsNotAvailableScreenConfiguration: ScreenConfiguration;
}

export type ScreenPointer =
  | DirectScreenPointer
  | BackScreenPointer
  | BranchByEventSpaceRequirementScreenPointer
  | BranchByRoomAvailabilityOnDatesScreenPointer
  | SubmitFormAndBranchByInstantOfferAvailabilityScreenPointer;
