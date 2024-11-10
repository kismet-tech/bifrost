import { maybeGetInstantBookOffers } from "@/api/maybeGetInstantBookOffers";
import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { submitBifrostForm } from "@/api/submitBifrostForm";
import { rewriteQuestionsWithResponsesToFormData } from "@/api/utilities/rewriteQuestionsWithResponsesToFormData";
import { ScreenConfiguration } from "@/models/configuration";
import { SubmitFormAndBranchByInstantOfferAvailabilityScreenPointer } from "@/models/configuration/pointers/ScreenPointer";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface RouteBranchByInstantOfferAvailabilityProps {
  pointer: SubmitFormAndBranchByInstantOfferAvailabilityScreenPointer;
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  setUserSessionId: ({ userSessionId }: { userSessionId: string }) => void;
  setInstantBookOffers: ({
    instantBookOffers,
  }: {
    instantBookOffers: RenderableBifrostInstantBookOffer[];
  }) => void;
  getQuestionsWithResponses: () => QuestionWithResponse[];
}

export const routeBranchByInstantOfferAvailability = async ({
  pointer,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  pushScreenConfigurationStack,
  setUserSessionId,
  setInstantBookOffers,
  getQuestionsWithResponses,
}: RouteBranchByInstantOfferAvailabilityProps) => {
  const questionsWithResponses: QuestionWithResponse[] =
    getQuestionsWithResponses();

  const formData = rewriteQuestionsWithResponsesToFormData({
    questionsWithResponses,
  });

  try {
    const { userSessionId } = await submitBifrostForm({
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      questionsWithResponses,
    });

    setUserSessionId({ userSessionId });

    console.log(`userSessionId: ${userSessionId}`);

    const { instantBookOffers: maybeInstantBookOffers } =
      await maybeGetInstantBookOffers({
        hotelId,
        bifrostTravelerId,
        bifrostFormId,
        localFormUserSessionId,
        formData,
        userSessionId,
      });

    console.log("maybeInstantBookOffers");
    console.log(JSON.stringify(maybeInstantBookOffers, null, 4));

    if (maybeInstantBookOffers.length === 0) {
      console.log("PUSHING instantOfferIsNotAvailableScreenConfiguration");

      pushScreenConfigurationStack(
        pointer.instantOfferIsNotAvailableScreenConfiguration
      );
    } else {
      console.log("PUSHING instantOfferIsAvailableScreenConfiguration");

      console.log(
        JSON.stringify(
          {
            ...pointer.instantOfferIsAvailableScreenConfiguration,
          },
          null,
          4
        )
      );

      setInstantBookOffers({
        instantBookOffers: maybeInstantBookOffers,
      });

      pushScreenConfigurationStack({
        ...pointer.instantOfferIsAvailableScreenConfiguration,
      });
    }
  } catch (error) {
    console.log(error);

    console.log("PUSHING instantOfferIsNotAvailableScreenConfiguration");

    pushScreenConfigurationStack(
      pointer.instantOfferIsNotAvailableScreenConfiguration
    );
  }
};
