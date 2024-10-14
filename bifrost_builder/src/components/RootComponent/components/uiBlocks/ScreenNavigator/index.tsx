import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ScreenConfiguration,
  ScreenNavigatorUIBlockConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { Button } from "@/components/ui/button";
import { maybeGetFirstMatchedScreenNavigatorPath } from "./maybeGetFirstMatchedScreenNavigatorPath";
import { routeWithPointer } from "@/components/RootComponent/utilities/routeWithPointer";

interface ScreenNavigatorProps {
  configuration: ScreenNavigatorUIBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  screenConfigurationStack: ScreenConfiguration[];
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ScreenNavigator({
  configuration: { paths, skipPath },
  formData,
  hotelId,
  setFormData,
  handleSubmitFormData,
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
}: ScreenNavigatorProps) {
  const maybeFirstMatchedScreenNavigatorPath =
    maybeGetFirstMatchedScreenNavigatorPath({
      paths,
      formData,
    });

  let forwardButton: JSX.Element;

  if (maybeFirstMatchedScreenNavigatorPath) {
    const onClickNextButton = () => {
      if (maybeFirstMatchedScreenNavigatorPath.submitsForm) {
        handleSubmitFormData();
      }

      routeWithPointer({
        pointer: maybeFirstMatchedScreenNavigatorPath.screenPointer,
        hotelId,
        formData,
        setFormData,
        handleSubmitFormData,
        pushScreenConfigurationStack,
        popRightscreenConfigurationStack,
      });
    };

    forwardButton = (
      <Button onClick={onClickNextButton}>
        {maybeFirstMatchedScreenNavigatorPath.forwardPathLabel}
      </Button>
    );
  } else if (skipPath) {
    const onClickSkipButton = () => {
      if (skipPath.submitsForm) {
        handleSubmitFormData();
      }

      routeWithPointer({
        pointer: skipPath.pointer,
        hotelId,
        formData,
        setFormData,
        handleSubmitFormData,
        pushScreenConfigurationStack,
        popRightscreenConfigurationStack,
      });
    };

    forwardButton = (
      <>
        <span onClick={onClickSkipButton}>Skip</span>
        <ChevronRight />
      </>
    );
  } else {
    forwardButton = <></>;
  }

  let backButton: JSX.Element;
  if (screenConfigurationStack.length > 1) {
    backButton = (
      <div className="flex items-center cursor-pointer">
        <ChevronLeft />
        <span>Back</span>
      </div>
    );
  } else {
    backButton = <></>;
  }

  return (
    <div className="flex justify-between">
      {backButton}

      <div className="ml-auto flex items-center cursor-pointer">
        {forwardButton}
      </div>
    </div>
  );
}
