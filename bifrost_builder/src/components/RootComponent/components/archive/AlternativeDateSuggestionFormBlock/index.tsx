import styled from "styled-components";
import { FormBlockConfiguration } from "../../../models";
import { Button } from "@/components/ui/button";
import { AlternativeDateSuggestionFormBlockConfiguration } from "../../models/AlternativeDateSuggestionFormBlockConfiguration";
import { CalendarDate } from "@/models/CalendarDate";
import { renderCalendarDate } from "@/utilities/dates/renderCalendarDate";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

interface AlternativeDateSuggestionFormBlockProps {
  configuration: AlternativeDateSuggestionFormBlockConfiguration;
  handleUpdateFormState: ({
    keyName,
    keyValue,
  }: {
    keyName: string;
    keyValue: string;
  }) => void;
  pushFormFieldConfigurationStack: (
    formBlockConfigurations: FormBlockConfiguration[]
  ) => void;
  formState: Record<string, string>;
  registerBifrostFormInput: () => Promise<void>;
}

export function AlternativeDateSuggestionFormBlock({
  configuration: {
    alternativeStartCalendarDateKeyName,
    alternativeEndCalendarDateKeyName,
    startCalendarDateKeyName,
    endCalendarDateKeyName,
    acceptAlternativeDatesLabel,
    rejectAlternativeDatesLabel,
    acceptedAlternativeDatesFormBlocks,
    rejectedAlternativeDatesFormBlocks,
  },
  handleUpdateFormState,
  pushFormFieldConfigurationStack,
  formState,
  registerBifrostFormInput,
}: AlternativeDateSuggestionFormBlockProps) {
  const alternativeStartCalendarDate: CalendarDate = JSON.parse(
    formState[alternativeStartCalendarDateKeyName]
  );

  const alternativeEndCalendarDate: CalendarDate = JSON.parse(
    formState[alternativeEndCalendarDateKeyName]
  );

  const onClickAcceptAlternativeDates = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    pushFormFieldConfigurationStack(acceptedAlternativeDatesFormBlocks);

    handleUpdateFormState({
      keyName: startCalendarDateKeyName,
      keyValue: JSON.stringify(alternativeStartCalendarDate),
    });

    handleUpdateFormState({
      keyName: endCalendarDateKeyName,
      keyValue: JSON.stringify(alternativeEndCalendarDate),
    });

    handleUpdateFormState({
      keyName: alternativeStartCalendarDateKeyName,
      keyValue: "",
    });

    handleUpdateFormState({
      keyName: alternativeEndCalendarDateKeyName,
      keyValue: "",
    });

    registerBifrostFormInput();
  };
  const onClickRejectAlternativeDates = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    pushFormFieldConfigurationStack(rejectedAlternativeDatesFormBlocks);

    handleUpdateFormState({
      keyName: alternativeStartCalendarDateKeyName,
      keyValue: "",
    });

    handleUpdateFormState({
      keyName: alternativeEndCalendarDateKeyName,
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
