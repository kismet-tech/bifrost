import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { TextAreaInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { ChangeEventHandler, useEffect, useState } from "react";
import { FormField } from "../styles/FormField";
import { FormLabel } from "../styles/FormLabel";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaInputUIBlockProps {
  configuration: TextAreaInputUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  onChange: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function TextAreaInputUIBlock({
  configuration,
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
          targetKeyName: configuration.keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!formData[configuration.keyName] && targetKeyStringValue) {
        updateLocalValue(targetKeyStringValue);
        onChange(targetKeyStringValue);
      }
    }

    prefillKismetFieldUsingPriorResponses();
  }, []);

  useEffect(() => {
    if (
      configuration.keyName in formData &&
      typeof formData[configuration.keyName] === "string"
    ) {
      updateLocalValue(formData[configuration.keyName] as string);
    } else {
      updateLocalValue("");
    }
  }, [formData, configuration]);

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
