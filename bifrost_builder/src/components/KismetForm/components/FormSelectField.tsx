import styled from "styled-components";
import { SelectFormFieldConfiguration } from "../models";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

export interface FormSelectFieldProps {
  configuration: SelectFormFieldConfiguration;
}

export function FormSelectField({
  configuration: { label, name, options },
}: FormSelectFieldProps) {
  return (
    <FormField>
      <FormLabel htmlFor={`form_${name}`}>{label}</FormLabel>
      <Select name={name} id={`form_${name}`}>
        {options.map(({ label, name }) => (
          <option key={name} value={name}>
            {label}
          </option>
        ))}
      </Select>
    </FormField>
  );
}
