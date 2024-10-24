import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  BifrostConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { BifrostScreen } from "./components/BifrostScreen";
import { registerBifrostFormInput } from "@/api/registerBifrostFormInput";
import { deleteKeysPresentOnScreenFromFormData } from "./components/BifrostScreen/deleteKeysPresentOnScreenFromFormData";
import { submitBifrostForm } from "@/api/submitBifrostForm";
import { mutateFormDataAtKeyPath } from "@/utilities/formData/mutateFormDataAtKeyPath";
import { useBifrostSessionData } from "@/contexts/useBifrostSessionData";

interface RootComponentWithProvidersProps {
  bifrostTravelerId: string;
  bifrostConfiguration: BifrostConfiguration;
}

export function RootComponentWithProviders({
  bifrostTravelerId,
  bifrostConfiguration,
}: RootComponentWithProvidersProps) {
  const { mutateBifrostSessionData } = useBifrostSessionData();

  const [localFormUserSessionId] = useState<string>(uuidv4());

  const [screenConfigurationStack, setScreenConfigurationStack] = useState<
    ScreenConfiguration[]
  >([bifrostConfiguration.rootScreenConfiguration as ScreenConfiguration]);

  const [formData, setFormData] = useState<BifrostFormData>({});

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
        bifrostFormId={bifrostConfiguration.bifrostFormId}
        localFormUserSessionId={localFormUserSessionId}
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
        handleSubmitFormData={async (): Promise<void> => {
          const { userSessionId } = await submitBifrostForm({
            hotelId: bifrostConfiguration.hotelId,
            bifrostTravelerId,
            bifrostFormId: bifrostConfiguration.bifrostFormId,
            localFormUserSessionId,
            formData,
          });

          mutateBifrostSessionData({
            key: "userSessionId",
            value: userSessionId,
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).userSessionId = userSessionId;

          mutateFormDataAtKeyPath({
            mutations: [
              {
                keyPath: ["userSessionId"],
                keyValue: userSessionId,
              },
            ],
            setFormData,
          });

          await new Promise((r) => setTimeout(r, 1000));
        }}
      />
    </div>
  );
}
