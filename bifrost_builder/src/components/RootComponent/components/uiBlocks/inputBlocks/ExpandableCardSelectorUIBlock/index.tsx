import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { ExpandableCardSelectorUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { useEffect, useState } from "react";
import { ExpandableSelectionCard } from "@/components/ui/expandable-selection-card";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";

interface ExpandableCardSelectorUIBlockProps {
  configuration: ExpandableCardSelectorUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  onChange: (selectedCardName: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ExpandableCardSelectorUIBlock({
  configuration: { label, keyName, options },
  hotelId,
  formData,
  onChange,
  registerBifrostFormInput,
}: ExpandableCardSelectorUIBlockProps) {
  const [localSelectedCardName, setLocalSelectedCardName] = useState("");

  useEffect(() => {
    async function prefillValue() {
      const { targetKeyStringValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData,
          targetKeyName: keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!formData[keyName] && targetKeyStringValue) {
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
