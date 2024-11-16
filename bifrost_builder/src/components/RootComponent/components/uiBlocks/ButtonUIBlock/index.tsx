import { updateBifrostUserSession } from "@/api/updateBifrostUserSession";
import { routeWithPointer } from "@/components/RootComponent/utilities/routeWithPointer";
import { Button } from "@/components/ui/button";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import {
  ButtonUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  FormQuestionResponseType,
  FormQuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

interface ButtonUIBlockProps {
  configuration: ButtonUIBlockConfiguration;
  handleSubmitFormData: () => Promise<void>;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ButtonUIBlock({
  configuration: {
    label,
    submitsForm,
    screenPointer: pointer,
    formQuestionId,
    formQuestionResponse,
  },
  handleSubmitFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
}: ButtonUIBlockProps) {
  const {
    getUserSessionId,
    getHotelId,
    setUserSessionId,
    setInstantBookOffers,
    maybeGetQuestionWithResponseByFormQuestionId,
    setProposedAlternativeDates,
    setResponseToQuestion,
    getQuestionsWithResponses,
    maybeGetBifrostTravelerId,
    maybeGetBifrostFormId,
    maybeGetLocalFormUserSessionId,
  } = useBifrostFormState();

  const hotelId: string = getHotelId();

  const bifrostTravelerId: string = maybeGetBifrostTravelerId() as string;

  const bifrostFormId: string = maybeGetBifrostFormId() as string;

  const localFormUserSessionId: string =
    maybeGetLocalFormUserSessionId() as string;

  const questionsWithResponses: FormQuestionWithResponse[] =
    getQuestionsWithResponses();

  const maybeUserSessionId = getUserSessionId();

  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (submitsForm) {
      await handleSubmitFormData();
    }

    if (formQuestionId && formQuestionResponse) {
      setResponseToQuestion({
        questionWithResponse: {
          formQuestionId,
          responseType: FormQuestionResponseType.STRING,
          response: formQuestionResponse,
        },
      });

      if (maybeUserSessionId) {
        updateBifrostUserSession({
          hotelId,
          bifrostTravelerId,
          bifrostFormId,
          localFormUserSessionId,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          updatedFormData: questionsWithResponses as any,
          userSessionId: maybeUserSessionId,
        });
      }
    }

    if (pointer) {
      routeWithPointer({
        pointer,
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
    }

    registerBifrostFormInput();
  };

  return (
    <Wrapper>
      <Button onClick={handleButtonClick}>{label}</Button>
    </Wrapper>
  );
}
