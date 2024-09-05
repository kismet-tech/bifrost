import styled from "styled-components";
import { FormTextField } from "./components/FormTextField";
import { FormFieldConfiguration, FormFieldType } from "./models";
import { FormSelectField } from "./components/FormSelectField";
import { FormTextAreaField } from "./components/FormTextAreaField";
import { useState } from "react";
import { FacebookLoginButton } from "./components/FacebookLoginButton/FacebookLoginButton";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateFormWasSubmitted(true);
  };

  if (formWasSubmitted) {
    return <div>Thank you!</div>;
  } else {
    return (
      <Form onSubmit={handleSubmit}>
        <FormTitle>Get in touch with our team</FormTitle>

        <FacebookButtonWrapper hidden={false}>
          <FacebookLoginButton />
        </FacebookButtonWrapper>

        {formFieldConfigurations.map((formFieldConfiguration, index) => {
          if (formFieldConfiguration.formFieldType === FormFieldType.TEXT) {
            return (
              <FormTextField
                key={index}
                configuration={formFieldConfiguration}
              />
            );
          } else if (
            formFieldConfiguration.formFieldType === FormFieldType.TEXT_AREA
          ) {
            return (
              <FormTextAreaField
                key={index}
                configuration={formFieldConfiguration}
              />
            );
          } else if (
            formFieldConfiguration.formFieldType === FormFieldType.SELECT
          ) {
            return (
              <FormSelectField
                key={index}
                configuration={formFieldConfiguration}
              />
            );
          }
        })}

        <Button>Submit</Button>
      </Form>
    );
  }
}
