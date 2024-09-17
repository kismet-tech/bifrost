import styled from "styled-components";
import { SelectInputFormBlockConfiguration } from "../models";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { ChangeEventHandler } from "react";

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

export interface FormSelectFieldProps {
  configuration: SelectInputFormBlockConfiguration;
  formState: Record<string, string>;
  onChange?: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function FormSelectField({
  configuration: { label, keyName, options },
  formState,
  onChange,
  registerBifrostFormInput,
}: FormSelectFieldProps) {
  const handleOnChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }

    registerBifrostFormInput();
  };

  const selectedValue = formState[keyName] || options[0].keyValue;

  return (
    <FormField>
      <FormLabel htmlFor={`form_${keyName}`}>{label}</FormLabel>
      <Select
        value={selectedValue}
        onChange={handleOnChange}
        name={keyName}
        id={`form_${keyName}`}
      >
        {options.map(({ label, keyValue: name }) => (
          <option key={name} value={name}>
            {label}
          </option>
        ))}
      </Select>
    </FormField>
  );
}
