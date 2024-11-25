import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { renderCalendarDate } from "@/utilities/dates/renderCalendarDate";
import {
  AlternativeDateSuggestionUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import { routeWithPointer } from "@/components/RootComponent/utilities/routeWithPointer";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { selectedDatesQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/dateQuestionGroupKnollcroftV3";
import { FormQuestionResponseType } from "@/models/formQuestions/questionWithResponse";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

interface AlternativeDateSuggestionUIBlockProps {
  configuration: AlternativeDateSuggestionUIBlockConfiguration;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function AlternativeDateSuggestionUIBlock({
  configuration: {
    acceptAlternativeDatesLabel,
    rejectAlternativeDatesLabel,
    acceptedAlternativeDatesScreenPointer,
    rejectedAlternativeDatesScreenPointer,
  },
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
}: AlternativeDateSuggestionUIBlockProps) {
  const {
    setUserSessionId,
    setInstantBookOffers,
    maybeGetProposedAlternativeDates,
    maybeGetQuestionWithResponseByFormQuestionId,
    getQuestionsWithResponses,
    setProposedAlternativeDates,
    setResponseToQuestion,
    getHotelId,
    maybeGetBifrostFormId,
    maybeGetLocalFormUserSessionId,
  } = useBifrostFormState();

  const hotelId: string = getHotelId();
  const bifrostTravelerId: string = maybeGetBifrostFormId() as string;
  const bifrostFormId: string = maybeGetBifrostFormId() as string;
  const localFormUserSessionId: string =
    maybeGetLocalFormUserSessionId() as string;

  const maybeProposedAlternativeDates: CalendarDateRange | undefined =
    maybeGetProposedAlternativeDates();
  const onClickAcceptAlternativeDates = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    routeWithPointer({
      pointer: acceptedAlternativeDatesScreenPointer,
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

    if (
      maybeProposedAlternativeDates?.startCalendarDate &&
      maybeProposedAlternativeDates?.endCalendarDate
    ) {
      setResponseToQuestion({
        questionWithResponse: {
          formQuestionId: selectedDatesQuestionKnollcroftV3.formQuestionId,
          responseType: FormQuestionResponseType.CALENDAR_DATE_RANGE,
          response: {
            startCalendarDate: maybeProposedAlternativeDates?.startCalendarDate,
            endCalendarDate: maybeProposedAlternativeDates?.endCalendarDate,
          },
        },
      });
    }
  };

  const rejectAlternativeDates = () => {
    routeWithPointer({
      pointer: rejectedAlternativeDatesScreenPointer,
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

  const onClickRejectAlternativeDates = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    rejectAlternativeDates();

    registerBifrostFormInput();
  };

  if (
    !maybeProposedAlternativeDates?.startCalendarDate ||
    !maybeProposedAlternativeDates?.endCalendarDate
  ) {
    rejectAlternativeDates();
  }

  const renderedAlternativeStartCalendarDate =
    maybeProposedAlternativeDates?.startCalendarDate
      ? renderCalendarDate({
          calendarDate: maybeProposedAlternativeDates.startCalendarDate,
        })
      : "";
  const renderedAlternativeEndCalendarDate =
    maybeProposedAlternativeDates?.endCalendarDate
      ? renderCalendarDate({
          calendarDate: maybeProposedAlternativeDates.endCalendarDate,
        })
      : "";

  return (
    <Wrapper>
      <div>Sorry, but have no availability on those dates.</div>
      <div>
        However, we do have availability from
        {renderedAlternativeStartCalendarDate} to{" "}
        {renderedAlternativeEndCalendarDate}
      </div>

      <Button onClick={onClickAcceptAlternativeDates}>
        {acceptAlternativeDatesLabel}
      </Button>
      <Button onClick={onClickRejectAlternativeDates}>
        {rejectAlternativeDatesLabel}
      </Button>
    </Wrapper>
  );
}
