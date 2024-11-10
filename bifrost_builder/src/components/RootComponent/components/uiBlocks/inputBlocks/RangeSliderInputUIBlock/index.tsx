import { RangeSliderInputUIBlockConfiguration } from "@/models/configuration";
import { Slider } from "@/components/ui/slider";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { useState } from "react";

interface RangeSliderInputUIBlockProps {
  configuration: RangeSliderInputUIBlockConfiguration;
  registerBifrostFormInput: () => Promise<void>;
}

export function RangeSliderInputUIBlock({
  configuration: {
    label,
    initialRangeMin,
    initialRangeMax,
    initialStepSize,
    formQuestionId,
  },
  registerBifrostFormInput,
}: RangeSliderInputUIBlockProps) {
  const [rangeMin] = useState<number>(initialRangeMin);
  const [rangeMax] = useState<number>(initialRangeMax);
  const [stepSize] = useState<number>(initialStepSize || 1);

  const [localValue, setLocalValue] = useState<{
    min: number;
    max: number;
  }>({ min: rangeMin, max: rangeMax });

  const onChangeLocalValue = ([changedMinValue, changedMaxValue]: number[]) => {
    if (typeof changedMinValue !== "number" || Number.isNaN(changedMinValue))
      return;
    if (typeof changedMaxValue !== "number" || Number.isNaN(changedMaxValue))
      return;

    if (changedMaxValue < changedMinValue) return;

    const updatedLocalValue = { min: changedMinValue, max: changedMaxValue };

    setLocalValue(updatedLocalValue);
    registerBifrostFormInput();

    // if (changedMaxValue > 0.95 * rangeMax) {
    //   setRangeMax(rangeMax * 1.25);
    // }
  };

  const inputId = `kismet_${formQuestionId}`;

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
