import styled from "styled-components";
import { TextAreaFormFieldConfiguration } from "../models";
import { FormLabel } from "./FormLabel";
import { FormField } from "./FormField";
import { ChangeEventHandler } from "react";

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

export interface FormTextAreaFieldProps {
  configuration: TextAreaFormFieldConfiguration;
  onChange?: (value: string) => void;
}

export function FormTextAreaField({
  configuration: { label, name, placeholder },
  onChange,
}: FormTextAreaFieldProps) {
  const handleOnChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_${name}`}>{label}</FormLabel>
      <TextArea
        onChange={handleOnChange}
        id={`form_${name}`}
        placeholder={placeholder}
      />
    </FormField>
  );
}
