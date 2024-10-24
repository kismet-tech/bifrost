import { routeWithPointer } from "@/components/RootComponent/utilities/routeWithPointer";
import { Button } from "@/components/ui/button";
import {
  ScreenConfiguration,
  ScreenNavigatorUIBlockConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useState } from "react";
import { maybeGetFirstMatchedScreenNavigatorPath } from "./maybeGetFirstMatchedScreenNavigatorPath";
import { useBifrostSessionData } from "@/contexts/useBifrostSessionData";

interface ScreenNavigatorProps {
  configuration: ScreenNavigatorUIBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
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
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  setFormData,
  handleSubmitFormData,
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
}: ScreenNavigatorProps) {
  const { mutateBifrostSessionData } = useBifrostSessionData();

  const maybeFirstMatchedScreenNavigatorPath =
    maybeGetFirstMatchedScreenNavigatorPath({
      paths,
      formData,
    });

  let forwardButton: JSX.Element | null;

  if (maybeFirstMatchedScreenNavigatorPath) {
    const onClickNextButton = async () => {
      if (maybeFirstMatchedScreenNavigatorPath.submitsForm) {
        handleSubmitFormData();
      }

      await routeWithPointer({
        pointer: maybeFirstMatchedScreenNavigatorPath.screenPointer,
        hotelId,
        bifrostTravelerId,
        bifrostFormId,
        localFormUserSessionId,
        formData,
        setFormData,
        handleSubmitFormData,
        pushScreenConfigurationStack,
        popRightscreenConfigurationStack,
        mutateBifrostSessionData,
      });
    };

    forwardButton = (
      <NavigatorNextButton
        onClick={onClickNextButton}
        label={maybeFirstMatchedScreenNavigatorPath.forwardPathLabel}
      />
    );
  } else if (skipPath) {
    const onClickSkipButton = () => {
      if (skipPath.submitsForm) {
        handleSubmitFormData();
      }

      routeWithPointer({
        pointer: skipPath.pointer,
        hotelId,
        bifrostTravelerId,
        bifrostFormId,
        localFormUserSessionId,
        formData,
        setFormData,
        handleSubmitFormData,
        pushScreenConfigurationStack,
        popRightscreenConfigurationStack,
        mutateBifrostSessionData,
      });
    };

    forwardButton = (
      <Button variant="ghost" onClick={onClickSkipButton}>
        Skip
        <ChevronRight className="h-5 w-5" />
      </Button>
    );
  } else {
    forwardButton = null;
  }

  let backButton: JSX.Element | null;
  const onClickBackButton: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();

    routeWithPointer({
      pointer: {
        type: ScreenPointerType.BACK,
      },
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      formData,
      setFormData,
      handleSubmitFormData,
      pushScreenConfigurationStack,
      popRightscreenConfigurationStack,
      mutateBifrostSessionData,
    });
  };

  if (screenConfigurationStack.length > 1) {
    backButton = (
      <Button variant="ghost" onClick={onClickBackButton}>
        <ChevronLeft className="h-5 w-5" />
        Back
      </Button>
    );
  } else {
    backButton = null;
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center">{backButton}</div>
      <div className="flex items-center">{forwardButton}</div>
    </div>
  );
}

interface NavigatorNextButtonProps {
  onClick: () => Promise<void>;
  label: string;
}

function NavigatorNextButton({ onClick, label }: NavigatorNextButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClickNextButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onClick();
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <Button onClick={onClickNextButton}>
      {label}
      {isSubmitting && (
        <Loader className="h-5 w-5 animate-spin duration-1600" />
      )}
    </Button>
  );
}
