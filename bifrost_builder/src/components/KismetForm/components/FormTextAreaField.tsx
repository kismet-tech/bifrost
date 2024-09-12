import styled from "styled-components";
import { TextAreaInputFormBlockConfiguration } from "../models";
import { FormLabel } from "./FormLabel";
import { FormField } from "./FormField";
import { ChangeEventHandler, useEffect, useState } from "react";

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

export interface FormTextAreaFieldProps {
  configuration: TextAreaInputFormBlockConfiguration;
  formState: Record<string, string>;
  onChange?: (value: string) => void;
}

export function FormTextAreaField({
  configuration,
  formState,
  onChange,
}: FormTextAreaFieldProps) {
  const [localValue, updateLocalValue] = useState<string>("");

  useEffect(() => {
    if (configuration.keyName in formState) {
      updateLocalValue(formState[configuration.keyName]);
    } else {
      updateLocalValue("");
    }
  }, [formState, configuration]);

  const handleOnChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }

    updateLocalValue(value);
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_${configuration.keyName}`}>
        {configuration.label}
      </FormLabel>
      <TextArea
        onChange={handleOnChange}
        id={`form_${configuration.keyName}`}
        placeholder={configuration.placeholder}
        value={localValue}
      />
    </FormField>
  );
}
