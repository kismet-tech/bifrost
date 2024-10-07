import { FormBlockConfiguration, FormBlockType } from ".";

export interface AlternativeDateSuggestionFormBlockConfiguration {
  formBlockType: FormBlockType.ALTERNATIVE_DATE_SUGGESTION_FORM_BLOCK;

  alternativeStartCalendarDateKeyName: string;
  alternativeEndCalendarDateKeyName: string;

  startCalendarDateKeyName: string;
  endCalendarDateKeyName: string;

  acceptAlternativeDatesLabel: string;
  rejectAlternativeDatesLabel: string;

  acceptedAlternativeDatesFormBlocks: FormBlockConfiguration[];
  rejectedAlternativeDatesFormBlocks: FormBlockConfiguration[];
}
