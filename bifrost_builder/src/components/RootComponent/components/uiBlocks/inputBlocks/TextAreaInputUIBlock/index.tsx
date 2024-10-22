import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { TextAreaInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";

interface TextAreaInputUIBlockProps {
  configuration: TextAreaInputUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  onChange: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function TextAreaInputUIBlock({
  configuration: { keyName, placeholder, label, smartFill },
  hotelId,
  formData,
  onChange,
  registerBifrostFormInput,
}: TextAreaInputUIBlockProps) {
  const [localValue, updateLocalValue] = useState<string>("");

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
        updateLocalValue(targetKeyStringValue);
        onChange(targetKeyStringValue);
      }
    }

    if (smartFill) {
      prefillKismetFieldUsingPriorResponses();
    }
  }, []);

  useEffect(() => {
    if (keyName in formData && typeof formData[keyName] === "string") {
      updateLocalValue(formData[keyName] as string);
    } else {
      updateLocalValue("");
    }
  }, [formData, keyName]);

  const handleOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }

    updateLocalValue(value);
    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_${keyName}`}>{label}</FormLabel>
      <Textarea
        onChange={handleOnChange}
        id={`form_${keyName}`}
        placeholder={placeholder}
        value={localValue}
      />
    </FormField>
  );
}
