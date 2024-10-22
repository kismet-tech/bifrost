import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { CalendarDate } from "@/models/CalendarDate";
import { renderCalendarDate } from "@/utilities/dates/renderCalendarDate";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import {
  AlternativeDateSuggestionUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import { routeWithPointer } from "@/components/RootComponent/utilities/routeWithPointer";
import { mutateFormDataAtKeyPath } from "@/utilities/formData/mutateFormDataAtKeyPath";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

interface AlternativeDateSuggestionUIBlockProps {
  configuration: AlternativeDateSuggestionUIBlockConfiguration;
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function AlternativeDateSuggestionUIBlock({
  configuration: {
    startCalendarDateKeyPath,
    endCalendarDateKeyPath,
    alternativeStartCalendarDateKeyPath,
    alternativeEndCalendarDateKeyPath,
    acceptAlternativeDatesLabel,
    rejectAlternativeDatesLabel,
    acceptedAlternativeDatesScreenPointer,
    rejectedAlternativeDatesScreenPointer,
  },
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  setFormData,
  handleSubmitFormData,
  pushScreenConfigurationStack,
  formData,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
}: AlternativeDateSuggestionUIBlockProps) {
  const alternativeStartCalendarDate: CalendarDate =
    getValueFromBifrostFormDataByKeyPath({
      formData,
      keyPath: alternativeStartCalendarDateKeyPath,
    });

  const alternativeEndCalendarDate: CalendarDate =
    getValueFromBifrostFormDataByKeyPath({
      formData,
      keyPath: alternativeEndCalendarDateKeyPath,
    });

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
      formData,
      setFormData,
      handleSubmitFormData,
      pushScreenConfigurationStack,
      popRightscreenConfigurationStack,
    });

    mutateFormDataAtKeyPath({
      mutations: [
        {
          keyPath: startCalendarDateKeyPath,
          keyValue: alternativeStartCalendarDate,
        },
        {
          keyPath: endCalendarDateKeyPath,
          keyValue: alternativeEndCalendarDate,
        },
        {
          keyPath: alternativeStartCalendarDateKeyPath,
          keyValue: undefined,
        },
        {
          keyPath: alternativeEndCalendarDateKeyPath,
          keyValue: undefined,
        },
      ],
      setFormData,
    });

    registerBifrostFormInput();
  };

  const rejectAlternativeDates = () => {
    routeWithPointer({
      pointer: rejectedAlternativeDatesScreenPointer,
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      formData,
      setFormData,
      handleSubmitFormData,
      pushScreenConfigurationStack,
      popRightscreenConfigurationStack,
    });

    mutateFormDataAtKeyPath({
      mutations: [
        {
          keyPath: alternativeStartCalendarDateKeyPath,
          keyValue: undefined,
        },
        {
          keyPath: alternativeEndCalendarDateKeyPath,
          keyValue: undefined,
        },
      ],
      setFormData,
    });
  };

  const onClickRejectAlternativeDates = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    rejectAlternativeDates();

    registerBifrostFormInput();
  };

  if (!alternativeStartCalendarDate || !alternativeEndCalendarDate) {
    rejectAlternativeDates();
  }

  const renderedAlternativeStartCalendarDate = alternativeStartCalendarDate
    ? renderCalendarDate({
        calendarDate: alternativeStartCalendarDate,
      })
    : "";
  const renderedAlternativeEndCalendarDate = alternativeEndCalendarDate
    ? renderCalendarDate({
        calendarDate: alternativeEndCalendarDate,
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
