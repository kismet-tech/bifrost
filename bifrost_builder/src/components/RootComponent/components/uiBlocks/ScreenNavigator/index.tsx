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
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ScreenNavigator({
  configuration,
  formData,
  hotelId,
  setFormData,
  handleSubmitFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
}: ScreenNavigatorProps) {
  const maybeFirstMatchedScreenNavigatorPath =
    maybeGetFirstMatchedScreenNavigatorPath({
      paths: configuration.paths,
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

    forwardButton = <Button onClick={onClickNextButton}>Next</Button>;
  } else {
    const onClickSkipButton = () => {
      if (configuration.skipPath.submitsForm) {
        handleSubmitFormData();
      }

      routeWithPointer({
        pointer: configuration.skipPath.pointer,
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
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center cursor-pointer">
        <ChevronLeft />
        <span>Back</span>
      </div>
      <div className="flex items-center cursor-pointer">{forwardButton}</div>
    </div>
  );
}
