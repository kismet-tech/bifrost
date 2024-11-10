import { determineIfBifrostTravelerRequiresAnEventSpace } from "@/api/determineIfBifrostTravelerRequiresAnEventSpace";
import { ScreenConfiguration } from "@/models/configuration";
import {
  ScreenPointer,
  ScreenPointerType,
} from "@/models/configuration/pointers/ScreenPointer";
import { routeBranchByRoomAvailabilityOnDates } from "./routeBranchByRoomAvailabilityOnDates";
import { routeBranchByInstantOfferAvailability } from "./routeBranchByInstantOfferAvailability";
import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface routeWithPointerProps {
  pointer: ScreenPointer;
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  setUserSessionId: ({ userSessionId }: { userSessionId: string }) => void;
  setInstantBookOffers: ({
    instantBookOffers,
  }: {
    instantBookOffers: RenderableBifrostInstantBookOffer[];
  }) => void;
  maybeGetQuestionWithResponseByFormQuestionId: ({
    formQuestionId,
  }: {
    formQuestionId: string;
  }) => QuestionWithResponse | undefined;
  getQuestionsWithResponses: () => QuestionWithResponse[];
  setProposedAlternativeDates: ({
    calendarDateRange,
  }: {
    calendarDateRange: CalendarDateRange;
  }) => void;
}

export const routeWithPointer = async ({
  pointer,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  setUserSessionId,
  setInstantBookOffers,
  maybeGetQuestionWithResponseByFormQuestionId,
  getQuestionsWithResponses,
  setProposedAlternativeDates,
}: routeWithPointerProps) => {
  if (pointer.type === ScreenPointerType.DIRECT) {
    pushScreenConfigurationStack(pointer.screenConfiguration);
  } else if (pointer.type === ScreenPointerType.BACK) {
    popRightscreenConfigurationStack();
  } else if (
    pointer.type === ScreenPointerType.BRANCH_BY_EVENT_SPACE_REQUIREMENT
  ) {
    const questionsWithResponses: QuestionWithResponse[] =
      getQuestionsWithResponses();

    const { isEventSpaceRequired } =
      await determineIfBifrostTravelerRequiresAnEventSpace({
        hotelId,
        questionsWithResponses,
      });

    if (isEventSpaceRequired) {
      pushScreenConfigurationStack(
        pointer.eventSpaceIsRequiredScreenConfiguration
      );
    } else {
      pushScreenConfigurationStack(
        pointer.eventSpaceIsNotRequiredScreenConfiguration
      );
    }
  } else if (
    pointer.type === ScreenPointerType.BRANCH_BY_ROOM_AVAILABILITY_ON_DATES
  ) {
    await routeBranchByRoomAvailabilityOnDates({
      pointer,
      hotelId,
      pushScreenConfigurationStack,
      maybeGetQuestionWithResponseByFormQuestionId,
      getQuestionsWithResponses,
      setProposedAlternativeDates,
    });
  } else if (
    pointer.type ===
    ScreenPointerType.SUBMIT_FORM_AND_BRANCH_BY_INSTANT_OFFER_AVAILABILITY
  ) {
    await routeBranchByInstantOfferAvailability({
      pointer,
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      pushScreenConfigurationStack,
      setUserSessionId,
      setInstantBookOffers,
      getQuestionsWithResponses,
    });
  }
};
