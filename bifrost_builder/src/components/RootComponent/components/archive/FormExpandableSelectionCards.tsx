import { useEffect, useState } from "react";
import { ExpandableSelectionCardsConfiguration } from "../../models";
import {
  PrefilledBifrostFormValueType,
  attemptToPrefillKismetFieldUsingPriorResponses,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { ExpandableSelectionCard } from "@/components/ui/expandable-selection-card";

export interface FormExpandableSelectionCardsProps {
  configuration: ExpandableSelectionCardsConfiguration;
  hotelId: string;
  formState: Record<string, string>;
  onChange: (selectedCardName: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function FormExpandableSelectionCards({
  configuration: { label, keyName, options },
  hotelId,
  formState,
  onChange,
  registerBifrostFormInput,
}: FormExpandableSelectionCardsProps) {
  const [localSelectedCardName, setLocalSelectedCardName] = useState("");

  useEffect(() => {
    async function prefillValue() {
      const { targetKeyStringValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData: formState,
          targetKeyName: keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!formState[keyName] && targetKeyStringValue) {
        setLocalSelectedCardName(targetKeyStringValue);
        onChange(targetKeyStringValue);
      }
    }

    prefillValue();
  }, []);

  const onChangeLocalValue = (cardName: string) => (checked: boolean) => {
    if (checked) {
      setLocalSelectedCardName(cardName);
      onChange(cardName);
    }
    registerBifrostFormInput();
  };

  const labelId = `kismet_${keyName}`;

  return (
    <FormField>
      <FormLabel id={labelId}>{label}</FormLabel>
      <div
        role="group"
        aria-describedby={labelId}
        className="flex flex-wrap gap-4"
      >
        {options.map((option) => (
          <ExpandableSelectionCard
            key={option.name}
            imageSrc={option.imageSrc}
            name={option.name}
            description={option.description}
            checked={option.name === localSelectedCardName}
            onChange={onChangeLocalValue(option.name)}
          />
        ))}
      </div>
    </FormField>
  );
}
