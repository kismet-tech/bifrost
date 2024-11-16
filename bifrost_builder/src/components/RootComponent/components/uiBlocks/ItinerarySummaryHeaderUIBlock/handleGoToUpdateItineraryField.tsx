import { RenderableBifrostInstantBookOffer } from "@/api/instantBookOffers/models";
import { routeWithPointer } from "@/components/RootComponent/utilities/routeWithPointer";
import { generateNextScreenConfiguration } from "@/getBifrostConfiguration/formQuestions/generateNextScreenConfiguration";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { ScreenConfiguration } from "@/models/configuration";
import {
  ScreenPointer,
  ScreenPointerType,
} from "@/models/configuration/pointers/ScreenPointer";
import {
  FormQuestionId,
  BagOfQuestions,
  FormQuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";

interface HandleGoToUpdateItineraryFieldProps {
  targetFormQuestionId: FormQuestionId;

  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  bagOfQuestions: BagOfQuestions;

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
  }) => FormQuestionWithResponse | undefined;
  getQuestionsWithResponses: () => FormQuestionWithResponse[];
  setProposedAlternativeDates: ({
    calendarDateRange,
  }: {
    calendarDateRange: CalendarDateRange;
  }) => void;
}

export const handleGoToUpdateItineraryField = ({
  targetFormQuestionId,

  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  bagOfQuestions,

  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  setUserSessionId,
  setInstantBookOffers,
  maybeGetQuestionWithResponseByFormQuestionId,
  getQuestionsWithResponses,
  setProposedAlternativeDates,
}: HandleGoToUpdateItineraryFieldProps) => {
  const screenConfiguration = generateNextScreenConfiguration({
    bagOfQuestions,
    targetFormQuestionId,
  });

  const pointer: ScreenPointer = {
    type: ScreenPointerType.DIRECT,
    screenConfiguration,
  };

  routeWithPointer({
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
  });
};
