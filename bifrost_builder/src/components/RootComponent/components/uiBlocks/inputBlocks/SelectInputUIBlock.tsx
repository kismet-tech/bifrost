import { SelectInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { FormField } from "../styles/FormField";
import { FormLabel } from "../styles/FormLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { useEffect } from "react";

interface SelectInputUIBlockProps {
  configuration: SelectInputUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  onChange: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function SelectInputUIBlock({
  configuration: { label, keyName, options },
  hotelId,
  formData,
  onChange,
  registerBifrostFormInput,
}: SelectInputUIBlockProps) {
  const selectedValue: string =
    formData[keyName] && typeof formData[keyName] === "string"
      ? (formData[keyName] as string)
      : (options[0].keyValue as string);

  // Attempt to Prefill Field Using Prior Responses
  useEffect(() => {
    async function prefillKismetFieldUsingPriorResponses() {
      const { targetKeyStringValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData: formData,
          targetKeyName: keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!formData[keyName] && targetKeyStringValue) {
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
