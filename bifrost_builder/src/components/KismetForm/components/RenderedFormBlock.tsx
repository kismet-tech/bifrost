import { FormBlockConfiguration, FormBlockType } from "../models";
import { FormHeader } from "./FormHeader";
import { FormMetadata } from "./FormMetadata";
import { FormSelectField } from "./FormSelectField";
import { FormSubheader } from "./FormSubheader";
import { FormTextAreaField } from "./FormTextAreaField";
import { FormTextField } from "./FormTextField";
import { RenderableBrancingNode } from "./RenderedBranchingNode";
import { ReturnToPreviousBranchButton } from "./ReturnToPreviousBranchButton";
import { SmartGreetingSubheader } from "./SmartGreetingSubheader";

interface RenderableFormBlockProps {
  renderedFormFieldConfiguration: FormBlockConfiguration;
  maybeBifrostTravelerId?: string;
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
  maybeBifrostTravelerId,
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
    FormBlockType.SMART_GREETING_SUBHEADER
  ) {
    return (
      <SmartGreetingSubheader
        configuration={renderedFormFieldConfiguration}
        maybeBifrostTravelerId={maybeBifrostTravelerId}
        formState={formState}
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
