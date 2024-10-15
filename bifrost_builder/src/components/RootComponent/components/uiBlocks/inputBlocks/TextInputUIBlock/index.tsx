import { TextInputUIBlockConfiguration } from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { Input } from "@/components/ui/input";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";

interface TextInputUIBlockProps {
  configuration: TextInputUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  keyPath: BifrostKeyPath;
  onChange: (value: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function TextInputUIBlock({
  configuration: {
    keyName,
    label,
    inputType,
    placeholder,
    autocomplete,
    smartFill,
  },
  hotelId,
  formData,
  keyPath,
  onChange,
  registerBifrostFormInput,
}: TextInputUIBlockProps) {
  const [localValue, setLocalValue] = useState<string>("");

  const accumulatedKeyPath: BifrostKeyPath = [...keyPath, keyName];
  const keyValue = getValueFromBifrostFormDataByKeyPath({
    formData,
    keyPath: accumulatedKeyPath,
  });

  // Attempt to Prefill Field Using Prior Responses
  useEffect(() => {
    async function prefillKismetFieldUsingPriorResponses() {
      const { targetKeyStringValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData,
          targetKeyName: keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!formData[keyName] && targetKeyStringValue) {
        setLocalValue((previousLocalValue) => {
          if (!previousLocalValue || previousLocalValue.length === 0) {
            return targetKeyStringValue;
          }
          return previousLocalValue;
        });
        onChange(targetKeyStringValue);
      }
    }

    if (smartFill) {
      prefillKismetFieldUsingPriorResponses();
    }
  }, []);

  useEffect(() => {
    if (keyValue && typeof keyValue === "string") {
      setLocalValue(keyValue as string);
    } else {
      setLocalValue("");
    }
  }, [keyValue]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (onChange) {
      onChange(value);
    }

    setLocalValue(value);
    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`kismet_${keyName}`}>{label}</FormLabel>
      <Input
        onChange={handleOnChange}
        type={inputType}
        id={`kismet_${keyName}`}
        placeholder={placeholder}
        autoComplete={autocomplete}
        value={localValue}
      />
    </FormField>
  );
}
