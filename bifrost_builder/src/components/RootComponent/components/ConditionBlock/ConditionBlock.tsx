import {
  ConditonBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { LayoutBlock } from "../layoutBlocks/LayoutBlock";
import { getKeyPathsFromConditionBlockPath } from "./getKeyPathsFromConditionBlock";
import { pruneUnaccessibleConditionKeyPathsFromFormData } from "./pruneUnaccessibleConditionKeyPathsFromFormData";
import { doesFormDataMatchOnKeyPathCondition } from "../../../../utilities/formData/doesConditionBlockMatchOnCondition";

export interface ConditionOutcome {
  renderedConditionPath: JSX.Element | null;
  conditionIsTrue: boolean;
  keyPathsInConditionPath: BifrostKeyPath[];
}

interface ConditionBlockProps {
  configuration: ConditonBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  screenConfigurationStack: ScreenConfiguration[];
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
  setFormData,
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: ConditionBlockProps) {
  const conditionOutcomes: ConditionOutcome[] = paths.map(
    ({ condition, layout }, index) => {
      const conditionIsTrue: boolean = doesFormDataMatchOnKeyPathCondition({
        condition,
        formData,
      });

      const { keyPaths: keyPathsInConditionPath } =
        getKeyPathsFromConditionBlockPath({
          conditionBlockPath: { condition, layout },
          blockKeyPath: keyPath,
        });

      let renderedConditionPath: JSX.Element | null;
      if (conditionIsTrue) {
        renderedConditionPath = (
          <LayoutBlock
            key={index}
            configuration={layout}
            keyPath={keyPath}
            formData={formData}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            setFormData={setFormData}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
            screenConfigurationStack={screenConfigurationStack}
            pushScreenConfigurationStack={pushScreenConfigurationStack}
            popRightscreenConfigurationStack={popRightscreenConfigurationStack}
          />
        );
      } else {
        renderedConditionPath = null;
      }

      return {
        renderedConditionPath,
        conditionIsTrue,
        keyPathsInConditionPath,
      };
    }
  );

  pruneUnaccessibleConditionKeyPathsFromFormData({
    conditionOutcomes,
    setFormData,
  });

  return conditionOutcomes.map((outcome) => outcome.renderedConditionPath);
}
