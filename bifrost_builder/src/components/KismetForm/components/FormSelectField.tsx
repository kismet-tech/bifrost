import {
  PrefilledBifrostFormValueType,
  attemptToPrefillKismetFieldUsingPriorResponses,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { SelectInputFormBlockConfiguration } from "../models";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";

export interface FormSelectFieldProps {
  configuration: SelectInputFormBlockConfiguration;
  hotelId: string;
  formState: Record<string, string>;
  onChange: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function FormSelectField({
  configuration: { label, keyName, options },
  hotelId,
  formState,
  onChange,
  registerBifrostFormInput,
}: FormSelectFieldProps) {
  const selectedValue = formState[keyName] || options[0].keyValue;

  // Attempt to Prefill Field Using Prior Responses
  useEffect(() => {
    async function prefillKismetFieldUsingPriorResponses() {
      const { targetKeyStringValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData: formState,
          targetKeyName: keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!formState[keyName] && targetKeyStringValue) {
        onChange(targetKeyStringValue);
      }
    }

    prefillKismetFieldUsingPriorResponses();
  }, []);

  const handleOnChange = (value: string) => {
    onChange(value);
    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_${keyName}`}>{label}</FormLabel>
      <Select
        value={selectedValue}
        onValueChange={handleOnChange}
        name={keyName}
      >
        <SelectTrigger id={`form_${keyName}`}>
          <SelectValue placeholder="Contact me by..." />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, keyValue: name }) => (
            <SelectItem key={name} value={name}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}
