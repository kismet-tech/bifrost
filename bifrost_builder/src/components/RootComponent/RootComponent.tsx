import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  BifrostConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { BifrostScreen } from "./components/BifrostScreen";
import { handleSubmitFormData } from "./utilities/handleSubmitFormData";
import { registerBifrostFormInput } from "@/api/registerBifrostFormInput";
import { deleteKeysPresentOnScreenFromFormData } from "./components/BifrostScreen/deleteKeysPresentOnScreenFromFormData";

interface KismetRootComponentProps {
  bifrostTravelerId: string;
  bifrostConfiguration: BifrostConfiguration;
}

export function KismetRootComponent({
  bifrostTravelerId,
  bifrostConfiguration,
}: KismetRootComponentProps) {
  const [localFormUserSessionId] = useState<string>(uuidv4());

  const [screenConfigurationStack, setScreenConfigurationStack] = useState<
    ScreenConfiguration[]
  >([bifrostConfiguration.rootScreenConfiguration as ScreenConfiguration]);

  const [formData, setFormData] = useState<BifrostFormData>({});

  console.log("formData");
  console.log(JSON.stringify(formData, null, 4));

  const setFormDataWithCallback = useCallback(setFormData, [setFormData]);

  const pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void = (screenConfiguration: ScreenConfiguration) => {
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
    <div>
      <BifrostScreen
        screenConfiguration={renderedBifrostScreenConfiguration}
        keyPath={[]}
        formData={formData}
        hotelId={bifrostConfiguration.hotelId}
        bifrostTravelerId={bifrostTravelerId}
        setFormData={setFormDataWithCallback}
        screenConfigurationStack={screenConfigurationStack}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
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
    </div>
  );
}
