import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { ExpandableCardSelectorUIBlockConfiguration } from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { useEffect, useState } from "react";
import { ExpandableSelectionCard } from "@/components/ui/expandable-selection-card";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";

interface ExpandableCardSelectorUIBlockProps {
  configuration: ExpandableCardSelectorUIBlockConfiguration;
  hotelId: string;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  onChange: (selectedCardName: string) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ExpandableCardSelectorUIBlock({
  configuration: { label, keyName, options, smartFill },
  hotelId,
  keyPath,
  formData,
  onChange,
  registerBifrostFormInput,
}: ExpandableCardSelectorUIBlockProps) {
  const [localSelectedCardName, setLocalSelectedCardName] = useState("");

  const keyValue: string = getValueFromBifrostFormDataByKeyPath({
    formData,
    keyPath: [...keyPath, keyName],
  });

  useEffect(() => {
    async function prefillValue() {
      const { targetKeyStringValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData,
          targetKeyName: keyName,
          targetValueType: PrefilledBifrostFormValueType.STRING,
        });

      if (!keyValue && targetKeyStringValue) {
        setLocalSelectedCardName(targetKeyStringValue);
        onChange(targetKeyStringValue);
      }
    }

    if (smartFill) {
      prefillValue();
    }
  }, []);

  useEffect(() => {
    if (keyValue && typeof keyValue === "string") {
      setLocalSelectedCardName(keyValue as string);
    } else {
      setLocalSelectedCardName("");
    }
  }, [keyValue]);

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
