import styled from "styled-components";
import { FormBlockConfiguration, FormBlockType } from "./models";
import { useCallback, useState } from "react";
import { FacebookLoginButton } from "./components/FacebookLoginButton/FacebookLoginButton";
import axios from "axios";
import { deepEqual } from "@/utilities/deepEqual";
import { RenderableFormBlock } from "./components/RenderedFormBlock";

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

// const Button = styled.button`
//   width: 100%;
//   margin-top: 1.5rem;
//   background-color: #57c0b2;
//   color: white;
//   padding: 0.5rem 1rem;
//   border-radius: 0.25rem;
//   border: none;
//   cursor: pointer;
//   font-size: 1rem;
//   font-family: barlow-regular, "Helvetica Neue", Helvetica, Arial, sans-serif;
// `;

const FacebookButtonWrapper = styled.div`
  width: 50%; /* Make the Facebook button half the size of the form */
  float: left; /* Float the button to the left */
  margin-bottom: 1.5rem; /* Add some spacing below the button */
`;

interface KismetFormProps {
  formFieldConfigurations: FormBlockConfiguration[];
}

export function KismetForm({ formFieldConfigurations }: KismetFormProps) {
  const getInitialFormState = (): Record<string, string> => {
    return formFieldConfigurations.reduce(
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

  // const [
  //   renderedFormFieldConfigurations,
  //   updateRenderedFormFieldConfigurations,
  // ] = useState<FormBlockConfiguration[]>([...formFieldConfigurations]);
  const [formFieldConfigurationsStack, updateFormFieldConfigurationsStack] =
    useState<FormBlockConfiguration[][]>([formFieldConfigurations]);

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
                if ("keyName" in poppedFormFieldConfiguration) {
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
    const apiBaseUrl = "https://api.makekismet.com";
    // const apiBaseUrl = "http://localhost:4000";
    await axios.post(
      `${apiBaseUrl}/Bifrost/SubmitGroupBookingForm`,
      { formData: formState },
      {}
    );

    console.log("COMPLETED");
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
            <RenderableFormBlock
              key={index}
              renderedFormFieldConfiguration={renderedFormFieldConfiguration}
              formState={formState}
              handleUpdateFormState={handleUpdateFormState}
              handleSubmitForm={handleSubmitForm}
              pushFormFieldConfigurationStack={pushFormFieldConfigurationStack}
              popRightFormFieldConfigurationStack={
                popRightFormFieldConfigurationStack
              }
            />
          );
        }
      )}
    </Form>
  );
}
