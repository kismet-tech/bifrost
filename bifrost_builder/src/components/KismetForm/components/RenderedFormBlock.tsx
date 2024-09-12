import { FormBlockConfiguration, FormBlockType } from "../models";
import { FormHeader } from "./FormHeader";
import { FormSelectField } from "./FormSelectField";
import { FormSubheader } from "./FormSubheader";
import { FormTextAreaField } from "./FormTextAreaField";
import { FormTextField } from "./FormTextField";
import { RenderableBrancingNode } from "./RenderedBranchingNode";
import { ReturnToPreviousBranchButton } from "./ReturnToPreviousBranchButton";

interface RenderableFormBlockProps {
  renderedFormFieldConfiguration: FormBlockConfiguration;
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
}

export function RenderableFormBlock({
  renderedFormFieldConfiguration,
  formState,
  handleUpdateFormState,
  handleSubmitForm,
  pushFormFieldConfigurationStack,
  popRightFormFieldConfigurationStack,
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
  }
}
