import { useCallback, useState } from "react";
import { deepEqual } from "@/utilities/deepEqual";
import { v4 as uuidv4 } from "uuid";
import {
  BifrostConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostFormDataValue,
} from "@/models/configuration/formData";
import { deleteKeysPresentOnScreenFromFormData } from "./components/BifrostScreen/deleteKeysPresentOnScreenFromFormData";
import { BifrostScreen } from "./components/BifrostScreen";

interface KismetFormProps {
  bifrostTravelerId: string;
  bifrostConfiguration: BifrostConfiguration;
}

export function KismetRootComponent({
  bifrostTravelerId,
  bifrostConfiguration,
}: KismetFormProps) {
  const [localFormUserSessionId] = useState<string>(uuidv4());

  const [screenConfigurationStack, setScreenConfigurationStack] = useState<
    ScreenConfiguration[]
  >([bifrostConfiguration.rootScreenConfiguration]);

  const [formData, setFormData] = useState<BifrostFormData>({});

  const handleSetFormData = useCallback(
    ({
      keyName,
      keyValue,
    }: {
      keyName: string;
      keyValue: BifrostFormDataValue;
    }) => {
      setFormData((previousFormState) => {
        const updatedFormState = { ...previousFormState, [keyName]: keyValue };

        if (!deepEqual(previousFormState, updatedFormState)) {
          return updatedFormState;
        }

        return previousFormState;
      });
    },
    []
  );

  const pushScreen: (screenConfiguration: ScreenConfiguration) => void = (
    screenConfiguration: ScreenConfiguration
  ) => {
    setScreenConfigurationStack(
      (previousScreenConfigurationStack: ScreenConfiguration[]) => {
        return [...previousScreenConfigurationStack, screenConfiguration];
      }
    );
  };

  const popRightscreenConfigurationStack = () => {
    setScreenConfigurationStack(
      (previousScreenConfigurationStack: ScreenConfiguration[]) => {
        if (previousScreenConfigurationStack.length > 0) {
          const poppedScreenConfiguration: ScreenConfiguration =
            previousScreenConfigurationStack[
              previousScreenConfigurationStack.length - 1
            ];

          deleteKeysPresentOnScreenFromFormData({
            poppedScreenConfiguration,
            setFormData,
          });

          const updatedScreenConfigurationStack: ScreenConfiguration[] = [
            ...previousScreenConfigurationStack.slice(0, -1),
          ];

          return updatedScreenConfigurationStack;
        } else {
          return previousScreenConfigurationStack;
        }
      }
    );
  };

  const renderedBifrostScreenConfiguration: ScreenConfiguration =
    screenConfigurationStack[screenConfigurationStack.length - 1];

  return (
    <BifrostScreen screenConfiguration={renderedBifrostScreenConfiguration} />
  );
}
