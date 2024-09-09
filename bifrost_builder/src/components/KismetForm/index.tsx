import styled from "styled-components";
import { FormTextField } from "./components/FormTextField";
import { FormFieldConfiguration, FormFieldType } from "./models";
import { FormSelectField } from "./components/FormSelectField";
import { FormTextAreaField } from "./components/FormTextAreaField";
import { useCallback, useState } from "react";
import { FacebookLoginButton } from "./components/FacebookLoginButton/FacebookLoginButton";
import axios from "axios";
import { deepEqual } from "@/utilities/deepEqual";

const Form = styled.form`
  width: 50vw;
  margin: 0 auto;
  padding: 2rem; /* Add padding around the form */
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem; /* Adjust padding for smaller screens */
  }
`;

const FormTitle = styled.div`
  font-size: 1.875rem; /* Equivalent to text-3xl */
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 1rem;
  font-family: barlow-regular, "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  background-color: #57c0b2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: barlow-regular, "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const FacebookButtonWrapper = styled.div`
  width: 50%; /* Make the Facebook button half the size of the form */
  float: left; /* Float the button to the left */
  margin-bottom: 1.5rem; /* Add some spacing below the button */
`;

interface KismetFormProps {
  formFieldConfigurations: FormFieldConfiguration[];
}

export function KismetForm({ formFieldConfigurations }: KismetFormProps) {
  const [formWasSubmitted, updateFormWasSubmitted] = useState(false);

  const getInitialFormState = () => {
    return formFieldConfigurations.reduce(
      (formState, formFieldConfiguration) => {
        if (formFieldConfiguration.formFieldType === FormFieldType.SELECT) {
          return {
            ...formState,
            [formFieldConfiguration.name]:
              formFieldConfiguration.options[0].name,
          };
        } else {
          return { ...formState, [formFieldConfiguration.name]: "" };
        }
      },
      {}
    );
  };

  const [formState, updateFormState] = useState(getInitialFormState());

  const handleUpdateFormState = useCallback(
    ({ name, value }: { name: string; value: string }) => {
      updateFormState((previousFormState) => {
        const updatedFormState = { ...previousFormState, [name]: value };

        if (!deepEqual(previousFormState, updatedFormState)) {
          return updatedFormState;
        }

        return previousFormState;
      });
    },
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const apiBaseUrl = "https://api.makekismet.com";
    // const apiBaseUrl = "http://localhost:4000";

    await axios.post(
      `${apiBaseUrl}/Bifrost/SubmitGroupBookingForm`,
      { ...formState, groupBookingFormType: "Group Booking" },
      {}
    );

    updateFormWasSubmitted(true);
  };

  if (formWasSubmitted) {
    return <div>Thank you!</div>;
  } else {
    return (
      <Form onSubmit={handleSubmit}>
        <FormTitle>Get in touch with our team</FormTitle>

        <FacebookButtonWrapper hidden={true}>
          <FacebookLoginButton />
        </FacebookButtonWrapper>

        {formFieldConfigurations.map((formFieldConfiguration, index) => {
          if (formFieldConfiguration.formFieldType === FormFieldType.TEXT) {
            return (
              <FormTextField
                key={index}
                configuration={formFieldConfiguration}
                onChange={(value) => {
                  handleUpdateFormState({
                    name: formFieldConfiguration.name,
                    value,
                  });
                }}
              />
            );
          } else if (
            formFieldConfiguration.formFieldType === FormFieldType.TEXT_AREA
          ) {
            return (
              <FormTextAreaField
                key={index}
                configuration={formFieldConfiguration}
                onChange={(value) => {
                  handleUpdateFormState({
                    name: formFieldConfiguration.name,
                    value,
                  });
                }}
              />
            );
          } else if (
            formFieldConfiguration.formFieldType === FormFieldType.SELECT
          ) {
            return (
              <FormSelectField
                key={index}
                configuration={formFieldConfiguration}
                onChange={(value) => {
                  handleUpdateFormState({
                    name: formFieldConfiguration.name,
                    value,
                  });
                }}
              />
            );
          }
        })}

        <Button>Submit</Button>
      </Form>
    );
  }
}
