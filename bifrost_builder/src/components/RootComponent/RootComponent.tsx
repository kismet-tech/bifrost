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
import { BifrostScreen } from "./components/BifrostScreen";
import { handleSubmitFormData } from "./utilities/handleSubmitFormData";
import { registerBifrostFormInput } from "@/api/registerBifrostFormInput";

interface KismetFormProps {
  bifrostTravelerId: string;
  bifrostConfiguration: BifrostConfiguration;
}

export function KismetRootComponent({
  bifrostTravelerId,
  bifrostConfiguration,
}: KismetFormProps) {
  const [localFormUserSessionId] = useState<string>(uuidv4());

  const [
    screenConfigurationStack,
    // setScreenConfigurationStack
  ] = useState<ScreenConfiguration[]>([
    bifrostConfiguration.rootScreenConfiguration as ScreenConfiguration,
  ]);

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

  // const pushScreenConfigurationStack: (
  //   screenConfiguration: ScreenConfiguration
  // ) => void = (screenConfiguration: ScreenConfiguration) => {
  //   setScreenConfigurationStack(
  //     (previousScreenConfigurationStack: ScreenConfiguration[]) => {
  //       return [...previousScreenConfigurationStack, screenConfiguration];
  //     }
  //   );
  // };

  // const popRightscreenConfigurationStack = () => {
  //   setScreenConfigurationStack(
  //     (previousScreenConfigurationStack: ScreenConfiguration[]) => {
  //       if (previousScreenConfigurationStack.length > 0) {
  //         const poppedScreenConfiguration: ScreenConfiguration =
  //           previousScreenConfigurationStack[
  //             previousScreenConfigurationStack.length - 1
  //           ];

  //         deleteKeysPresentOnScreenFromFormData({
  //           poppedScreenConfiguration,
  //           setFormData,
  //         });

  //         const updatedScreenConfigurationStack: ScreenConfiguration[] = [
  //           ...previousScreenConfigurationStack.slice(0, -1),
  //         ];

  //         return updatedScreenConfigurationStack;
  //       } else {
  //         return previousScreenConfigurationStack;
  //       }
  //     }
  //   );
  // };

  const renderedBifrostScreenConfiguration: ScreenConfiguration =
    screenConfigurationStack[screenConfigurationStack.length - 1];

  return (
    <BifrostScreen
      screenConfiguration={renderedBifrostScreenConfiguration}
      formData={formData}
      hotelId={bifrostConfiguration.hotelId}
      bifrostTravelerId={bifrostTravelerId}
      handleSetFormData={handleSetFormData}
      registerBifrostFormInput={async () => {
        await registerBifrostFormInput({
          hotelId: bifrostConfiguration.hotelId,
          bifrostTravelerId,
          bifrostFormId: bifrostConfiguration.bifrostFormId,
          localFormUserSessionId,
          formData,
        });
      }}
      handleSubmitFormData={() =>
        handleSubmitFormData({
          bifrostTravelerId,
          localFormUserSessionId,
          bifrostConfiguration,
          formData,
        })
      }
    />
  );
}
