import styled from "styled-components";
import { TextFormFieldConfiguration } from "../models";
import { FormLabel } from "./FormLabel";
import { FormField } from "./FormField";
import { ChangeEventHandler } from "react";

const Input = styled.input`
  width: 100%;
  padding: 0.5rem; /* Equivalent to p-2 */
  border: 1px solid #d1d5db; /* Equivalent to border-gray-300 */
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

export interface FormTextFieldProps {
  configuration: TextFormFieldConfiguration;
  onChange?: (value: string) => void;
}

export function FormTextField({
  configuration: { label, name, placeholder, inputType },
  onChange,
}: FormTextFieldProps) {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    if (onChange) {
      console.log("THIS WAS HIT", value);
      onChange(value);
    }
  };

  return (
    <FormField>
      <FormLabel htmlFor={`${name}_email`}>{label}</FormLabel>
      <Input
        onChange={handleOnChange}
        type={inputType}
        id={`${name}_email`}
        placeholder={placeholder}
      />
    </FormField>
  );
}
