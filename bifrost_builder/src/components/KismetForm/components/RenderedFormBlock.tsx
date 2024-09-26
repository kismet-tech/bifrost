import { CalendarDate } from "@/models/CalendarDate";
import { FormBlockConfiguration, FormBlockType } from "../models";
import { FormDateRangePickerField } from "./FormDateRangePickerField";
import { FormHeader } from "./FormHeader";
import { FormMetadata } from "./FormMetadata";
import { FormSelectField } from "./FormSelectField";
import { FormSubheader } from "./FormSubheader";
import { FormTextAreaField } from "./FormTextAreaField";
import { FormTextField } from "./FormTextField";
import { RenderableBrancingNode } from "./RenderedBranchingNode";
import { ReturnToPreviousBranchButton } from "./ReturnToPreviousBranchButton";
import { IsEventSpaceRequiredSmartBranchingNode } from "./SmartBranchingNodes/IsEventSpaceRequiredSmartBranchingNode";
import { SmartGreetingSubheader } from "./SmartMessages/SmartGreetingSubheader";
import { SmartFarewellSubheader } from "./SmartMessages/SmartFarewellSubheader";
import { GuestSocialMediaLoginField } from "./GuestSocialMediaLoginField";
import { AreRoomsAvailableOnDatesSmartBranchingNode } from "./SmartBranchingNodes/AreRoomsAvailableOnDatesSmartBranchingNode";
import { AlternativeDateSuggestionFormBlock } from "./AlternativeDateSuggestionFormBlock";

interface RenderableFormBlockProps {
  renderedFormFieldConfiguration: FormBlockConfiguration;
  bifrostTravelerId: string;
  hotelId: string;
  formState: Record<string, string>;
  handleUpdateFormState: ({
    keyName,
    keyValue,
  }: {
    keyName: string;
    keyValue: string;
  }) => void;
  handleSubmitForm: () => void;
  pushFormFieldConfigurationStack: (
    formBlockConfigurations: FormBlockConfiguration[]
  ) => void;
  popRightFormFieldConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function RenderedFormBlock({
  renderedFormFieldConfiguration,
  bifrostTravelerId,
  hotelId,
  formState,
  handleUpdateFormState,
  handleSubmitForm,
  pushFormFieldConfigurationStack,
  popRightFormFieldConfigurationStack,
  registerBifrostFormInput,
}: RenderableFormBlockProps) {
  if (renderedFormFieldConfiguration.formBlockType === FormBlockType.HEADER) {
    return (
      <FormHeader
        configuration={renderedFormFieldConfiguration}
        formState={formState}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType === FormBlockType.SUBHEADER
  ) {
    return (
      <FormSubheader
        configuration={renderedFormFieldConfiguration}
        formState={formState}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType === FormBlockType.TEXT_INPUT
  ) {
    return (
      <FormTextField
        configuration={renderedFormFieldConfiguration}
        formState={formState}
        onChange={(keyValue: string) => {
          handleUpdateFormState({
            keyName: renderedFormFieldConfiguration.keyName,
            keyValue,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.TEXT_AREA_INPUT
  ) {
    return (
      <FormTextAreaField
        configuration={renderedFormFieldConfiguration}
        formState={formState}
        onChange={(keyValue: string) => {
          handleUpdateFormState({
            keyName: renderedFormFieldConfiguration.keyName,
            keyValue,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType === FormBlockType.SELECT_INPUT
  ) {
    return (
      <FormSelectField
        configuration={renderedFormFieldConfiguration}
        formState={formState}
        onChange={(keyValue: string) => {
          handleUpdateFormState({
            keyName: renderedFormFieldConfiguration.keyName,
            keyValue,
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.DATE_RANGE_PICKER
  ) {
    return (
      <FormDateRangePickerField
        configuration={renderedFormFieldConfiguration}
        formState={formState}
        onChange={({
          startCalendarDate,
          endCalendarDate,
        }: {
          startCalendarDate?: CalendarDate;
          endCalendarDate?: CalendarDate;
        }) => {
          handleUpdateFormState({
            keyName: renderedFormFieldConfiguration.startCalendarDateKeyName,
            keyValue: JSON.stringify(startCalendarDate),
          });

          handleUpdateFormState({
            keyName: renderedFormFieldConfiguration.endCalendarDateKeyName,
            keyValue: JSON.stringify(endCalendarDate),
          });
        }}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.BRANCHING_NODE
  ) {
    return (
      <RenderableBrancingNode
        branchingNodeFormBlockConfiguration={renderedFormFieldConfiguration}
        handleUpdateFormState={handleUpdateFormState}
        pushFormFieldConfigurationStack={pushFormFieldConfigurationStack}
        handleSubmitForm={handleSubmitForm}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON
  ) {
    return (
      <ReturnToPreviousBranchButton
        returnToPreviousBranchButtonConfiguration={
          renderedFormFieldConfiguration
        }
        popRightFormFieldConfigurationStack={
          popRightFormFieldConfigurationStack
        }
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.IS_EVENT_SPACE_REQUIRED_SMART_BRANCHING_NODE
  ) {
    return (
      <IsEventSpaceRequiredSmartBranchingNode
        branchingNodeFormBlockConfiguration={renderedFormFieldConfiguration}
        pushFormFieldConfigurationStack={pushFormFieldConfigurationStack}
        hotelId={hotelId}
        formState={formState}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.ARE_ROOMS_AVAILABLE_ON_DATES_SMART_BRANCHING_NODE
  ) {
    return (
      <AreRoomsAvailableOnDatesSmartBranchingNode
        configuration={renderedFormFieldConfiguration}
        pushFormFieldConfigurationStack={pushFormFieldConfigurationStack}
        hotelId={hotelId}
        formState={formState}
        handleUpdateFormState={handleUpdateFormState}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.ALTERNATIVE_DATE_SUGGESTION_FORM_BLOCK
  ) {
    return (
      <AlternativeDateSuggestionFormBlock
        configuration={renderedFormFieldConfiguration}
        handleUpdateFormState={handleUpdateFormState}
        pushFormFieldConfigurationStack={pushFormFieldConfigurationStack}
        formState={formState}
        registerBifrostFormInput={registerBifrostFormInput}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.SMART_GREETING_SUBHEADER
  ) {
    return (
      <SmartGreetingSubheader
        configuration={renderedFormFieldConfiguration}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        formState={formState}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.SMART_FAREWELL_SUBHEADER
  ) {
    return (
      <SmartFarewellSubheader
        configuration={renderedFormFieldConfiguration}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        formState={formState}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType ===
    FormBlockType.GUEST_SOCIAL_MEDIA_LOGIN
  ) {
    return (
      <GuestSocialMediaLoginField
        configuration={renderedFormFieldConfiguration}
      />
    );
  } else if (
    renderedFormFieldConfiguration.formBlockType === FormBlockType.METADATA
  ) {
    return (
      <FormMetadata
        configuration={renderedFormFieldConfiguration}
        handleUpdateFormState={handleUpdateFormState}
      />
    );
  }
}
