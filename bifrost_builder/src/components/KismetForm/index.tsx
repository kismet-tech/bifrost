import styled from "styled-components";
import {
  BifrostConfiguration,
  FormBlockConfiguration,
  FormBlockType,
} from "./models";
import { useCallback, useState } from "react";
import { FacebookLoginButton } from "./components/FacebookLoginButton/FacebookLoginButton";
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

const FacebookButtonWrapper = styled.div`
  width: 50%; /* Make the Facebook button half the size of the form */
  float: left; /* Float the button to the left */
  margin-bottom: 1.5rem; /* Add some spacing below the button */
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
      (formState, formFieldConfiguration) => {
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

  const [formFieldConfigurationsStack, updateFormFieldConfigurationsStack] =
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
    updateFormFieldConfigurationsStack(
      (previousFormFieldConfigurationsStack: FormBlockConfiguration[][]) => {
        return [
          ...previousFormFieldConfigurationsStack,
          formBlockConfigurations,
        ];
      }
    );
  };

  const popRightFormFieldConfigurationStack = () => {
    updateFormFieldConfigurationsStack(
      (previousFormFieldConfigurationsStack) => {
        console.log(
          `previousFormFieldConfigurationsStack.length: ${previousFormFieldConfigurationsStack.length}`
        );
        if (previousFormFieldConfigurationsStack.length > 0) {
          const poppedFormFieldConfigurations =
            previousFormFieldConfigurationsStack[
              previousFormFieldConfigurationsStack.length - 1
            ];

          updateFormState((previousFormState): Record<string, string> => {
            const updatedFormState: Record<string, string> = {
              ...previousFormState,
            };

            poppedFormFieldConfigurations.forEach(
              (poppedFormFieldConfiguration) => {
                if (
                  "keyName" in poppedFormFieldConfiguration &&
                  poppedFormFieldConfiguration.keyName
                ) {
                  delete updatedFormState[poppedFormFieldConfiguration.keyName];
                }
              }
            );

            return updatedFormState;
          });

          const udatedFormFieldConfigurationsStack: FormBlockConfiguration[][] =
            [...previousFormFieldConfigurationsStack.slice(0, -1)];

          return udatedFormFieldConfigurationsStack;
        } else {
          return previousFormFieldConfigurationsStack;
        }
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
    formFieldConfigurationsStack[formFieldConfigurationsStack.length - 1];

  return (
    <Form>
      <FacebookButtonWrapper hidden={true}>
        <FacebookLoginButton />
      </FacebookButtonWrapper>

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
                popRightFormFieldConfigurationStack
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
