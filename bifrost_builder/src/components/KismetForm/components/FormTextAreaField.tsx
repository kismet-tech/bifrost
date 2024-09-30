import {
  PrefilledBifrostFormValueType,
  attemptToPrefillKismetFieldUsingPriorResponses,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { ChangeEventHandler, useEffect, useState } from "react";
import { TextAreaInputFormBlockConfiguration } from "../models";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { Textarea } from "@/components/ui/textarea";

export interface FormTextAreaFieldProps {
  configuration: TextAreaInputFormBlockConfiguration;
  hotelId: string;
  formState: Record<string, string>;
  onChange: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function FormTextAreaField({
  configuration,
  hotelId,
  formState,
  onChange,
  registerBifrostFormInput,
}: FormTextAreaFieldProps) {
  const [localValue, updateLocalValue] = useState<string>("");

  // Attempt to Prefill Field Using Prior Responses
  useEffect(() => {
    async function prefillKismetFieldUsingPriorResponses() {
      const { targetKeyStringValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData: formState,
          targetKeyName: configuration.keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!formState[configuration.keyName] && targetKeyStringValue) {
        updateLocalValue(targetKeyStringValue);
        onChange(targetKeyStringValue);
      }
    }

    prefillKismetFieldUsingPriorResponses();
  }, []);

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
    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_${configuration.keyName}`}>
        {configuration.label}
      </FormLabel>
      <Textarea
        onChange={handleOnChange}
        id={`form_${configuration.keyName}`}
        placeholder={configuration.placeholder}
        value={localValue}
      />
    </FormField>
  );
}
