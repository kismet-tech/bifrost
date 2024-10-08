import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { RangeSliderInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { useEffect, useState } from "react";
import { FormField } from "../styles/FormField";
import { FormLabel } from "../styles/FormLabel";
import { Slider } from "@/components/ui/slider";

interface RangeSliderInputUIBlockProps {
  configuration: RangeSliderInputUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  onChange: (value: { min?: number; max?: number }) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function RangeSliderInputUIBlock({
  configuration: {
    label,
    rangeMin,
    rangeMax,
    valueMinKeyName,
    valueMaxKeyName,
  },
  hotelId,
  formData,
  onChange,
  registerBifrostFormInput,
}: RangeSliderInputUIBlockProps) {
  const [localValue, setLocalValue] = useState<{
    min?: number;
    max?: number;
  }>({ min: undefined, max: undefined });

  useEffect(() => {
    async function prefillValueMin() {
      const { targetKeyNumberValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData,
          targetKeyName: valueMinKeyName,
          targetValueType: PrefilledBifrostFormValueType.NUMBER,
        });

      if (!formData[valueMinKeyName] && targetKeyNumberValue) {
        setLocalValue((prev) => {
          const nextValue = { ...prev, min: targetKeyNumberValue };

          onChange(nextValue);

          return nextValue;
        });
      }
    }

    async function prefillValueMax() {
      const { targetKeyNumberValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData,
          targetKeyName: valueMaxKeyName,
          targetValueType: PrefilledBifrostFormValueType.NUMBER,
        });

      if (!formData[valueMaxKeyName] && targetKeyNumberValue) {
        setLocalValue((prev) => {
          const nextValue = { ...prev, max: targetKeyNumberValue };

          onChange(nextValue);

          return nextValue;
        });
      }
    }

    prefillValueMin();
    prefillValueMax();
  }, []);

  const onChangeLocalValue = (value: number[]) => {
    if (!value[0] || !value[1]) return;
    if (value[1] < value[0]) return;

    const newValue = { min: value[0], max: value[1] };

    setLocalValue(newValue);
    onChange(newValue);
    registerBifrostFormInput();
  };

  const inputId = `kismet_${valueMinKeyName}_${valueMaxKeyName}`;

  const value = [localValue.min ?? rangeMin, localValue.max ?? rangeMax];
  const valueText =
    value[0] === value[1]
      ? value[0].toLocaleString()
      : `${value[0].toLocaleString()} - ${value[1].toLocaleString()}`;

  console.log(
    `rangeMin: ${rangeMin}, rangeMax: ${rangeMax}, value: ${value}, valueText: ${valueText}`
  );

  return (
    <FormField>
      <FormLabel htmlFor={inputId}>{label}</FormLabel>

      <div className="flex items-center gap-3">
        <Slider
          id={inputId}
          min={rangeMin}
          max={rangeMax}
          value={value}
          onValueChange={onChangeLocalValue}
        />
        <span className="whitespace-nowrap text-base">{valueText}</span>
      </div>
    </FormField>
  );
}
