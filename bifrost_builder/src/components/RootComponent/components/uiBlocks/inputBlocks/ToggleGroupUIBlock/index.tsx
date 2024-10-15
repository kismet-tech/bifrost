import {
  PrefilledBifrostFormValueType,
  attemptToPrefillKismetFieldUsingPriorResponses,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToggleGroupUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { useEffect } from "react";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";

interface ToggleGroupUIBlockProps {
  configuration: ToggleGroupUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  onChange: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ToggleGroupUIBlock({
  configuration: { label, keyName, options },
  hotelId,
  formData,
  onChange,
  registerBifrostFormInput,
}: ToggleGroupUIBlockProps) {
  const selectedValue = formData[keyName] as string | undefined;

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
      <ToggleGroup
        type="single"
        variant="outline"
        value={selectedValue}
        onValueChange={handleOnChange}
        className="py-2"
      >
        {options.map(({ label, keyValue }) => (
          <ToggleGroupItem key={keyValue} value={keyValue}>
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </FormField>
  );
}
