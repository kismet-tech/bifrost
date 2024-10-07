import { useEffect, useState } from "react";
import { RangeSliderInputConfiguration } from "../../models";
import {
  PrefilledBifrostFormValueType,
  attemptToPrefillKismetFieldUsingPriorResponses,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { Slider } from "@/components/ui/slider";

export interface FormRangeSliderProps {
  configuration: RangeSliderInputConfiguration;
  hotelId: string;
  formState: Record<string, string>;
  onChange: (value: { min?: number; max?: number }) => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function FormRangeSlider({
  configuration: {
    label,
    rangeMin,
    rangeMax,
    valueMinKeyName,
    valueMaxKeyName,
  },
  hotelId,
  formState,
  onChange,
  registerBifrostFormInput,
}: FormRangeSliderProps) {
  const [localValue, setLocalValue] = useState<{
    min?: number;
    max?: number;
  }>({ min: undefined, max: undefined });

  useEffect(() => {
    async function prefillValueMin() {
      const { targetKeyNumberValue } =
        await attemptToPrefillKismetFieldUsingPriorResponses({
          hotelId,
          formData: formState,
          targetKeyName: valueMinKeyName,
          targetValueType: PrefilledBifrostFormValueType.NUMBER,
        });

      if (!formState[valueMinKeyName] && targetKeyNumberValue) {
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
          formData: formState,
          targetKeyName: valueMaxKeyName,
          targetValueType: PrefilledBifrostFormValueType.NUMBER,
        });

      if (!formState[valueMaxKeyName] && targetKeyNumberValue) {
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
