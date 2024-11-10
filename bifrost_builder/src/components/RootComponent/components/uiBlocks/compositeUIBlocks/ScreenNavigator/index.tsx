import { routeWithPointer } from "@/components/RootComponent/utilities/routeWithPointer";
import { Button } from "@/components/ui/button";
import {
  ScreenConfiguration,
  ScreenNavigatorUIBlockConfiguration,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useState } from "react";
import { maybeGetFirstMatchedScreenNavigatorPath } from "./maybeGetFirstMatchedScreenNavigatorPath";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface ScreenNavigatorProps {
  configuration: ScreenNavigatorUIBlockConfiguration;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  screenConfigurationStack: ScreenConfiguration[];
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function ScreenNavigator({
  configuration: { paths, skipPath },
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  handleSubmitFormData,
}: ScreenNavigatorProps) {
  const {
    getHotelId,
    setUserSessionId,
    setInstantBookOffers,
    getQuestionsWithResponses,
    setProposedAlternativeDates,
    maybeGetQuestionWithResponseByFormQuestionId,
    maybeGetBifrostTravelerId,
    maybeGetBifrostFormId,
    maybeGetLocalFormUserSessionId,
  } = useBifrostFormState();

  const hotelId: string = getHotelId();

  const bifrostTravelerId: string = maybeGetBifrostTravelerId() as string;

  const bifrostFormId: string = maybeGetBifrostFormId() as string;

  const localFormUserSessionId: string =
    maybeGetLocalFormUserSessionId() as string;

  const formQuestionsWithResponses: QuestionWithResponse[] =
    getQuestionsWithResponses();

  console.log(
    `questionsWithResonses: ${JSON.stringify(
      formQuestionsWithResponses,
      null,
      4
    )}`
  );

  const maybeFirstMatchedScreenNavigatorPath =
    maybeGetFirstMatchedScreenNavigatorPath({
      paths,
      formQuestionsWithResponses,
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
        pushScreenConfigurationStack,
        popRightscreenConfigurationStack,
        setUserSessionId,
        setInstantBookOffers,
        maybeGetQuestionWithResponseByFormQuestionId,
        getQuestionsWithResponses,
        setProposedAlternativeDates,
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
        pushScreenConfigurationStack,
        popRightscreenConfigurationStack,
        setUserSessionId,
        setInstantBookOffers,
        maybeGetQuestionWithResponseByFormQuestionId,
        getQuestionsWithResponses,
        setProposedAlternativeDates,
      });
    };

    forwardButton = (
      <Button variant="ghost" onClick={onClickSkipButton}>
        {skipPath.skipLabel ? skipPath.skipLabel : "Skip"}
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
      pushScreenConfigurationStack,
      popRightscreenConfigurationStack,
      setUserSessionId,
      setInstantBookOffers,
      maybeGetQuestionWithResponseByFormQuestionId,
      getQuestionsWithResponses,
      setProposedAlternativeDates,
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
