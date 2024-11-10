import { determineIfRoomsAreAvailableForBifrostTravelerOnDates } from "@/api/determineIfRoomsAreAvailableForBifrostTravelerOnDates";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { ScreenConfiguration } from "@/models/configuration";
import { BranchByRoomAvailabilityOnDatesScreenPointer } from "@/models/configuration/pointers/ScreenPointer";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface RouteBranchByRoomAvailabilityOnDatesProps {
  pointer: BranchByRoomAvailabilityOnDatesScreenPointer;
  hotelId: string;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
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

export const routeBranchByRoomAvailabilityOnDates = async ({
  pointer,
  hotelId,
  pushScreenConfigurationStack,
  maybeGetQuestionWithResponseByFormQuestionId,
  getQuestionsWithResponses,
  setProposedAlternativeDates,
}: RouteBranchByRoomAvailabilityOnDatesProps) => {
  const questionsWithResponses: QuestionWithResponse[] =
    getQuestionsWithResponses();

  const maybeQuestionWithResponse =
    maybeGetQuestionWithResponseByFormQuestionId({
      formQuestionId: pointer.calendarDataFormQuestionId,
    });

  const maybeCalendarDateRange: CalendarDateRange | undefined =
    maybeQuestionWithResponse?.response as CalendarDateRange;

  if (
    !maybeCalendarDateRange ||
    !maybeCalendarDateRange.startCalendarDate ||
    !maybeCalendarDateRange.endCalendarDate
  ) {
    console.log(
      "Missing endCalendarDate or startCalendarDate | Pushing roomsAreAvailableBranchFormBlocks"
    );
    pushScreenConfigurationStack(
      pointer.roomsAreNotAvailableAndAlternativesAreNotAvailableScreenConfiguration
    );
  } else {
    const {
      roomsAreAvailable,
      alternativeStartCalendarDate,
      alternativeEndCalendarDate,
    } = await determineIfRoomsAreAvailableForBifrostTravelerOnDates({
      hotelId,
      startCalendarDate: maybeCalendarDateRange?.startCalendarDate,
      endCalendarDate: maybeCalendarDateRange?.endCalendarDate,
      questionsWithResponses,
    });

    if (roomsAreAvailable) {
      console.log("Pushing roomsAreAvailableBranchFormBlocks");
      pushScreenConfigurationStack(
        pointer.roomsAreAvailableScreenConfiguration
      );
    } else {
      if (alternativeStartCalendarDate && alternativeEndCalendarDate) {
        setProposedAlternativeDates({
          calendarDateRange: {
            startCalendarDate: alternativeStartCalendarDate,
            endCalendarDate: alternativeEndCalendarDate,
          },
        });

        console.log(
          "Pushing roomsAreNotAvailableBranchButAlternativesAreAvailableFormBlocks"
        );
        pushScreenConfigurationStack(
          pointer.roomsAreNotAvailableButAlternativesAreAvailableScreenConfiguration
        );
      } else {
        console.log(
          "Pushing roomsAreNotAvailableBranchAndNoAlternativesAreAvailableFormBlocks"
        );
        pushScreenConfigurationStack(
          pointer.roomsAreNotAvailableAndAlternativesAreNotAvailableScreenConfiguration
        );
      }
    }
  }
};
