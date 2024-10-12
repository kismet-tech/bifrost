import {
  ConditonBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import { LayoutBlock } from "../layoutBlocks/LayoutBlock";

interface ConditionBlockProps {
  configuration: ConditonBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  handleSetFormData: ({
    keyPath,
    keyValue,
  }: {
    keyPath: BifrostKeyPath;
    keyValue: BifrostFormDataValue;
  }) => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function ConditionBlock({
  configuration: { paths },
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: ConditionBlockProps) {
  return paths.map(({ conditions, layout }, index) => {
    const conditionIsTrue: boolean = conditions.every(
      ({ conditionKeyPath, conditionKeyValue }) => {
        const keyValue = getValueFromBifrostFormDataByKeyPath({
          keyPath: conditionKeyPath,
          formData,
        });

        if (!conditionKeyValue && keyValue !== undefined && keyValue !== null) {
          return true;
        } else {
          return conditionKeyValue === keyValue;
        }
      }
    );

    if (conditionIsTrue) {
      <LayoutBlock
        key={index}
        configuration={layout}
        keyPath={keyPath}
        formData={formData}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        handleSetFormData={handleSetFormData}
        registerBifrostFormInput={registerBifrostFormInput}
        handleSubmitFormData={handleSubmitFormData}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
      />;
    } else {
      return <></>;
    }
  });
}
