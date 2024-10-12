import {
  attemptToPrefillKismetFieldUsingPriorResponses,
  PrefilledBifrostFormValueType,
} from "@/api/attemptToPrefillKismetFieldUsingPriorResponses";
import { RangeSliderInputUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";

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
    initialRangeMin,
    initialRangeMax,
    valueMinKeyName,
    valueMaxKeyName,
    initialStepSize,
  },
  hotelId,
  formData,
  onChange,
  registerBifrostFormInput,
}: RangeSliderInputUIBlockProps) {
  const [rangeMin] = useState<number>(initialRangeMin);
  const [rangeMax] = useState<number>(initialRangeMax);
  const [stepSize] = useState<number>(initialStepSize || 1);

  const [localValue, setLocalValue] = useState<{
    min: number;
    max: number;
  }>({ min: rangeMin, max: rangeMax });

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
          // If the min value has already been set by the user, don't override it
          if (prev.min !== rangeMin) return prev;

          const updatedMinValue =
            typeof targetKeyNumberValue === "number" &&
            !Number.isNaN(targetKeyNumberValue)
              ? targetKeyNumberValue
              : prev.min;

          const updatedLocalValue = {
            ...prev,
            min: updatedMinValue,
          };

          onChange(updatedLocalValue);

          return updatedLocalValue;
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
          // If the max value has already been set by the user, don't override it
          if (prev.max !== rangeMax) return prev;

          const updatedMaxValue =
            typeof targetKeyNumberValue === "number" &&
            !Number.isNaN(targetKeyNumberValue)
              ? targetKeyNumberValue
              : prev.max;

          const updatedLocalValue = {
            ...prev,
            max: updatedMaxValue,
          };

          onChange(updatedLocalValue);

          return updatedLocalValue;
        });
      }
    }

    prefillValueMin();
    prefillValueMax();
  }, []);

  const onChangeLocalValue = ([changedMinValue, changedMaxValue]: number[]) => {
    if (typeof changedMinValue !== "number" || Number.isNaN(changedMinValue))
      return;
    if (typeof changedMaxValue !== "number" || Number.isNaN(changedMaxValue))
      return;

    if (changedMaxValue < changedMinValue) return;

    const updatedLocalValue = { min: changedMinValue, max: changedMaxValue };

    setLocalValue(updatedLocalValue);
    onChange(updatedLocalValue);
    registerBifrostFormInput();

    // if (changedMaxValue > 0.95 * rangeMax) {
    //   setRangeMax(rangeMax * 1.25);
    // }
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
          step={stepSize}
          onValueChange={onChangeLocalValue}
        />
        <span className="whitespace-nowrap text-base">{valueText}</span>
      </div>
    </FormField>
  );
}
