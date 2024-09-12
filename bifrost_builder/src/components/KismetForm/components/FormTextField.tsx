import styled from "styled-components";
import { TextInputFormBlockConfiguration } from "../models";
import { FormLabel } from "./FormLabel";
import { FormField } from "./FormField";
import { ChangeEventHandler, useEffect, useState } from "react";

const Input = styled.input`
  width: 100%;
  padding: 0.5rem; /* Equivalent to p-2 */
  border: 1px solid #d1d5db; /* Equivalent to border-gray-300 */
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

export interface FormTextFieldProps {
  configuration: TextInputFormBlockConfiguration;
  formState: Record<string, string>;
  onChange?: (value: string) => void;
}

export function FormTextField({
  configuration,
  formState,
  onChange,
}: FormTextFieldProps) {
  const [localValue, updateLocalValue] = useState<string>("");

  useEffect(() => {
    if (configuration.keyName in formState) {
      updateLocalValue(formState[configuration.keyName]);
    } else {
      updateLocalValue("");
    }
  }, [formState, configuration]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (onChange) {
      onChange(value);
    }

    updateLocalValue(value);
  };

  return (
    <FormField>
      <FormLabel htmlFor={`kismet_${configuration.keyName}`}>
        {configuration.label}
      </FormLabel>
      <Input
        onChange={handleOnChange}
        type={configuration.inputType}
        id={`kismet_${configuration.keyName}`}
        placeholder={configuration.placeholder}
        autoComplete={configuration.autocomplete}
        value={localValue}
      />
    </FormField>
  );
}
