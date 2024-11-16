import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  BifrostConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import { BifrostScreen } from "./components/BifrostScreen";
import { registerBifrostFormInput } from "@/api/registerBifrostFormInput";
import { submitBifrostForm } from "@/api/submitBifrostForm";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface RootComponentWithProvidersProps {
  bifrostTravelerId: string;
  bifrostConfiguration: BifrostConfiguration;
}

export function RootComponentWithProviders({
  bifrostTravelerId,
  bifrostConfiguration,
}: RootComponentWithProvidersProps) {
  const {
    setUserSessionId,
    deleteResponsesToQuestions,
    getQuestionsWithResponses,
  } = useBifrostFormState();

  const questionsWithResponses: FormQuestionWithResponse[] =
    getQuestionsWithResponses();

  const [localFormUserSessionId] = useState<string>(uuidv4());

  const [screenConfigurationStack, setScreenConfigurationStack] = useState<
    ScreenConfiguration[]
  >([bifrostConfiguration.rootScreenConfiguration as ScreenConfiguration]);

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

          deleteResponsesToQuestions({
            formQuestionIds: poppedScreenConfiguration.formQuestionIds,
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
        screenConfigurationStack={screenConfigurationStack}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={async () => {
          await registerBifrostFormInput({
            hotelId: bifrostConfiguration.hotelId,
            bifrostTravelerId,
            bifrostFormId: bifrostConfiguration.bifrostFormId,
            localFormUserSessionId,
            questionsWithResponses,
          });
        }}
        handleSubmitFormData={async (): Promise<void> => {
          const { userSessionId } = await submitBifrostForm({
            hotelId: bifrostConfiguration.hotelId,
            bifrostTravelerId,
            bifrostFormId: bifrostConfiguration.bifrostFormId,
            localFormUserSessionId,
            questionsWithResponses,
          });

          setUserSessionId({ userSessionId });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).userSessionId = userSessionId;

          await new Promise((r) => setTimeout(r, 1000));
        }}
      />
    </div>
  );
}
