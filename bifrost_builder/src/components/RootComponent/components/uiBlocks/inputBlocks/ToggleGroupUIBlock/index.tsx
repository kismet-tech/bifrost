import {
  PrefilledBifrostFormValueType,
  attemptToPrefillKismetFieldUsingPriorResponses,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToggleGroupUIBlockConfiguration } from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { useEffect } from "react";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";

interface ToggleGroupUIBlockProps {
  configuration: ToggleGroupUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  keyPath: BifrostKeyPath;
  onChange: (value: string | undefined) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ToggleGroupUIBlock({
  configuration: { label, keyName, options },
  hotelId,
  formData,
  keyPath,
  onChange,
  registerBifrostFormInput,
}: ToggleGroupUIBlockProps) {
  const selectedValue = getValueFromBifrostFormDataByKeyPath({
    formData,
    keyPath: [...keyPath, keyName],
  }) as string | undefined;

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
    if (value === "") {
      onChange(undefined);
    } else {
      onChange(value);
    }
    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_${keyName}`}>{label}</FormLabel>
      <ToggleGroup
        type="single"
        variant="outline"
        value={selectedValue ? selectedValue : ""}
        onValueChange={handleOnChange}
        className="flex w-full space-x-4 py-2"
      >
        {options.map(({ label, keyValue }) => (
          <ToggleGroupItem
            key={keyValue}
            value={keyValue}
            className="
              flex-1 px-4 py-2 text-center rounded-lg border border-black transition-colors duration-200 ease-in-out
              data-[state=on]:bg-black data-[state=on]:text-white
              data-[state=off]:bg-transparent data-[state=off]:text-black
            "
          >
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </FormField>
  );
}
