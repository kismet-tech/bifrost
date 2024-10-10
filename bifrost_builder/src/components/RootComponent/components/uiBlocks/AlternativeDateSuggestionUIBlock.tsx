import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { CalendarDate } from "@/models/CalendarDate";
import { renderCalendarDate } from "@/utilities/dates/renderCalendarDate";
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import {
  AlternativeDateSuggestionUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import { routeWithPointer } from "../../utilities/routeWithPointer";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

interface AlternativeDateSuggestionUIBlockProps {
  configuration: AlternativeDateSuggestionUIBlockConfiguration;
  hotelId: string;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  handleSetFormData: ({
    keyPath,
    keyValue,
  }: {
    keyPath: BifrostKeyPath;
    keyValue: BifrostFormDataValue;
  }) => void;
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
  handleSetFormData,
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
      formData,
      handleSetFormData,
      handleSubmitFormData,
      pushScreenConfigurationStack,
      popRightscreenConfigurationStack,
    });

    handleSetFormData({
      keyPath: startCalendarDateKeyPath,
      keyValue: alternativeStartCalendarDate,
    });

    handleSetFormData({
      keyPath: endCalendarDateKeyPath,
      keyValue: alternativeEndCalendarDate,
    });

    handleSetFormData({
      keyPath: alternativeStartCalendarDateKeyPath,
      keyValue: "",
    });

    handleSetFormData({
      keyPath: alternativeEndCalendarDateKeyPath,
      keyValue: "",
    });

    registerBifrostFormInput();
  };
  const onClickRejectAlternativeDates = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    routeWithPointer({
      pointer: rejectedAlternativeDatesScreenPointer,
      hotelId,
      formData,
      handleSetFormData,
      handleSubmitFormData,
      pushScreenConfigurationStack,
      popRightscreenConfigurationStack,
    });

    handleSetFormData({
      keyPath: alternativeStartCalendarDateKeyPath,
      keyValue: "",
    });

    handleSetFormData({
      keyPath: alternativeEndCalendarDateKeyPath,
      keyValue: "",
    });
    registerBifrostFormInput();
  };

  return (
    <Wrapper>
      <div>Sorry, but have no availability on those dates.</div>
      <div>
        However, we do have availability from $
        {renderCalendarDate({ calendarDate: alternativeStartCalendarDate })} to{" "}
        {renderCalendarDate({ calendarDate: alternativeEndCalendarDate })}
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
