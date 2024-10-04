import styled from "styled-components";
import {
  BifrostConfiguration,
  FormBlockConfiguration,
  FormBlockType,
  unrenderableFormBlockTypes,
} from "./models";
import { useCallback, useState } from "react";
import { deepEqual } from "@/utilities/deepEqual";
import { RenderedFormBlock } from "./components/RenderedFormBlock";
import { v4 as uuidv4 } from "uuid";
import { sentryScope } from "@/instrument";
import { registerBifrostFormInput } from "../../api/registerBifrostFormInput";
import { submitBifrostForm } from "../../api/submitBifrostForm";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50vw;
  margin: 0 auto;
  padding: 2rem; /* Add padding around the form */
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem; /* Adjust padding for smaller screens */
  }
`;

interface KismetFormProps {
  bifrostTravelerId: string;
  bifrostConfiguration: BifrostConfiguration;
}

export function KismetForm({
  bifrostTravelerId,
  bifrostConfiguration,
}: KismetFormProps) {
  const [localFormUserSessionId] = useState<string>(uuidv4());

  const getInitialFormState = (): Record<string, string> => {
    return bifrostConfiguration.formBlocks.reduce(
      (formState, formFieldConfiguration): Record<string, string> => {
        if (
          formFieldConfiguration.formBlockType === FormBlockType.TEXT_INPUT ||
          formFieldConfiguration.formBlockType === FormBlockType.TEXT_AREA_INPUT
        ) {
          return { ...formState, [formFieldConfiguration.keyName]: "" };
        } else if (
          formFieldConfiguration.formBlockType === FormBlockType.SELECT_INPUT
        ) {
          return {
            ...formState,
            [formFieldConfiguration.keyName]:
              formFieldConfiguration.options[0].keyValue,
          };
        } else {
          return { ...formState };
        }
      },
      {}
    );
  };

  const [formBlockConfigurationsStack, updateFormBlockConfigurationsStack] =
    useState<FormBlockConfiguration[][]>([bifrostConfiguration.formBlocks]);

  const [formState, updateFormState] = useState<Record<string, string>>(
    getInitialFormState()
  );

  const handleUpdateFormState = useCallback(
    ({ keyName, keyValue }: { keyName: string; keyValue: string }) => {
      updateFormState((previousFormState) => {
        const updatedFormState = { ...previousFormState, [keyName]: keyValue };

        if (!deepEqual(previousFormState, updatedFormState)) {
          return updatedFormState;
        }

        return previousFormState;
      });
    },
    []
  );

  const pushFormFieldConfigurationStack: (
    formBlockConfigurations: FormBlockConfiguration[]
  ) => void = (formBlockConfigurations: FormBlockConfiguration[]) => {
    updateFormBlockConfigurationsStack(
      (previousFormFieldConfigurationsStack: FormBlockConfiguration[][]) => {
        return [
          ...previousFormFieldConfigurationsStack,
          formBlockConfigurations,
        ];
      }
    );
  };

  const popRightFormBlockConfigurationsStack = () => {
    updateFormBlockConfigurationsStack(
      (previousBlockFieldConfigurationsStack) => {
        console.log(
          `previousBlockFieldConfigurationsStack.length: ${previousBlockFieldConfigurationsStack.length}`
        );

        let updatedFormFieldConfigurationsStack: FormBlockConfiguration[][] = [
          ...previousBlockFieldConfigurationsStack,
        ];
        const deletedFormStateKeyNames: string[] = [];

        while (
          updatedFormFieldConfigurationsStack.length > 0 &&
          // Stack has not been popped yet
          (previousBlockFieldConfigurationsStack.length ===
            updatedFormFieldConfigurationsStack.length ||
            // Every form block at the top of the stack is unrenderable
            updatedFormFieldConfigurationsStack[
              updatedFormFieldConfigurationsStack.length - 1
            ].some(({ formBlockType: poppedFormBlockType }) =>
              unrenderableFormBlockTypes.includes(poppedFormBlockType)
            ))
        ) {
          // Pop stack
          const poppedFormBlockConfigurations: FormBlockConfiguration[] =
            updatedFormFieldConfigurationsStack[
              updatedFormFieldConfigurationsStack.length - 1
            ];

          updatedFormFieldConfigurationsStack = [
            ...updatedFormFieldConfigurationsStack.slice(0, -1),
          ];

          poppedFormBlockConfigurations
            .filter(
              (formBlockConfiguration: FormBlockConfiguration) =>
                "keyName" in formBlockConfiguration &&
                formBlockConfiguration.keyName
            )
            .map(
              (formBlockConfiguration: FormBlockConfiguration) =>
                (formBlockConfiguration as { keyName: string }).keyName
            )
            .forEach((keyName: string) => {
              deletedFormStateKeyNames.push(keyName);
            });
        }

        updateFormState((previousFormState): Record<string, string> => {
          const updatedFormState: Record<string, string> = {
            ...previousFormState,
          };

          deletedFormStateKeyNames.forEach((deletedKeyName) => {
            delete updatedFormState[deletedKeyName];
          });

          return updatedFormState;
        });

        return updatedFormFieldConfigurationsStack;
      }
    );
  };

  const handleSubmitForm = async () => {
    try {
      const response = await submitBifrostForm({
        hotelId: bifrostConfiguration.hotelId,
        bifrostTravelerId,
        bifrostFormId: bifrostConfiguration.bifrostFormId,
        localFormUserSessionId,
        formData: formState,
      });

      if (response.data && response.data.error) {
        const serverError = new Error(
          `BIFROST_SERVER_ERROR: ${response.data.error}`
        );
        serverError.name = "BIFROST_SERVER_ERROR";
        sentryScope.setExtra("hotelId", bifrostConfiguration.hotelId);
        sentryScope.setExtra("bifrostTravelerId", bifrostTravelerId);
        sentryScope.setExtra(
          "bifrostFormId",
          bifrostConfiguration.bifrostFormId
        );
        sentryScope.setExtra("formData", formState);
        sentryScope.setExtra("version", __APP_VERSION__);
        sentryScope.setExtra("serverResponse", response.data);
        sentryScope.captureException(serverError);
        console.error("Error submitting form:", serverError);
      }
      console.log("COMPLETED");
    } catch (error) {
      const updatedError = new Error(
        `BIFROST_FORM_SUBMISSION_ERROR: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      updatedError.name = "BIFROST_FORM_SUBMISSION_ERROR";
      sentryScope.setExtra("hotelId", bifrostConfiguration.hotelId);
      sentryScope.setExtra("bifrostTravelerId", bifrostTravelerId);
      sentryScope.setExtra("bifrostFormId", bifrostConfiguration.bifrostFormId);
      sentryScope.setExtra("formData", formState);
      sentryScope.setExtra("version", __APP_VERSION__);
      sentryScope.captureException(updatedError);
      console.error("Error submitting form:", error);
    }
  };

  const renderedFormFieldConfigurations =
    formBlockConfigurationsStack[formBlockConfigurationsStack.length - 1];

  return (
    <Form>
      {renderedFormFieldConfigurations.map(
        (renderedFormFieldConfiguration, index) => {
          return (
            <RenderedFormBlock
              key={index}
              renderedFormFieldConfiguration={renderedFormFieldConfiguration}
              bifrostTravelerId={bifrostTravelerId}
              hotelId={bifrostConfiguration.hotelId}
              formState={formState}
              handleUpdateFormState={handleUpdateFormState}
              handleSubmitForm={handleSubmitForm}
              pushFormFieldConfigurationStack={pushFormFieldConfigurationStack}
              popRightFormFieldConfigurationStack={
                popRightFormBlockConfigurationsStack
              }
              registerBifrostFormInput={async () => {
                await registerBifrostFormInput({
                  hotelId: bifrostConfiguration.hotelId,
                  bifrostTravelerId,
                  bifrostFormId: bifrostConfiguration.bifrostFormId,
                  localFormUserSessionId,
                  formData: formState,
                });
              }}
            />
          );
        }
      )}
    </Form>
  );
}
