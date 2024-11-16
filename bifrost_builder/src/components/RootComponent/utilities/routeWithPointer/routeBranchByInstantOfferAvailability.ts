import {
  FormQuestionIdAndResponsePair,
  InstantBookOfferBookingCategory,
  RenderableBifrostInstantBookOffer,
} from "@/api/instantBookOffers/models";
import { getSinglePayerFirmDateInstantBookOffers } from "@/api/instantBookOffers/singlePayer/getSinglePayerFirmDateInstantBookOffers";
import { getSinglePayerFlexibleDateInstantBookOffers } from "@/api/instantBookOffers/singlePayer/getSinglePayerFlexibleDateInstantBookOffers";
import { getSplitPayerInstantBookOffers } from "@/api/instantBookOffers/splitPayer/getSplitPayerInstantBookOffers";
import { submitBifrostForm } from "@/api/submitBifrostForm";
import {
  dateFlexibilityQuestionKnollcroftV3,
  dateFlexibilityQuestionKnollcroftV3FirmDatesOption,
  dateFlexibilityQuestionKnollcroftV3FlexibleDatesOption,
  potentialDatesQuestionKnollcroftV3,
  selectedDatesQuestionKnollcroftV3,
  undecidedDateDetailsQuestionKnollcroftV3,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/dateQuestionGroupKnollcroftV3";
import {
  splitPaymentQuestionKnollcroftV3,
  splitPaymentQuestionKnollcroftV3SplitPaymentOption,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestAndPaymentQuestionGroupKnollcroftV3";
import {
  reasonForTravelQuestionKnollcroftV3,
  reasonForTravelQuestionKnollcroftV3BusinessOption,
  reasonForTravelQuestionKnollcroftV3OtherOption,
  reasonForTravelQuestionKnollcroftV3SocialOption,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/inquiryDetailsQuestionGroupKnollcroftV3";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { ScreenConfiguration } from "@/models/configuration";
import { SubmitFormAndBranchByInstantOfferAvailabilityScreenPointer } from "@/models/configuration/pointers/ScreenPointer";
import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

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
  getQuestionsWithResponses: () => FormQuestionWithResponse[];
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
  const questionsWithResponses: FormQuestionWithResponse[] =
    getQuestionsWithResponses();

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

    const formQuestionIdAndResponsePairs: FormQuestionIdAndResponsePair[] =
      questionsWithResponses.map(
        (question): FormQuestionIdAndResponsePair => ({
          formQuestionId: question.formQuestionId,
          response: JSON.stringify(question.response),
        })
      );

    const dateFlexibilityQuestion: FormQuestionWithResponse =
      questionsWithResponses.find(
        (questionWithResponse) =>
          questionWithResponse.formQuestionId ===
          dateFlexibilityQuestionKnollcroftV3.formQuestionId
      )!;

    const bookingCategoryQuestion: FormQuestionWithResponse =
      questionsWithResponses.find(
        (questionWithResponse) =>
          questionWithResponse.formQuestionId ===
          reasonForTravelQuestionKnollcroftV3.formQuestionId
      )!;

    const splitPaymentQuestion: FormQuestionWithResponse =
      questionsWithResponses.find(
        (questionWithResponse) =>
          questionWithResponse.formQuestionId ===
          splitPaymentQuestionKnollcroftV3.formQuestionId
      )!;

    let instantBookOfferBookingCategory: InstantBookOfferBookingCategory;
    if (
      bookingCategoryQuestion.response ===
      reasonForTravelQuestionKnollcroftV3BusinessOption.label
    ) {
      instantBookOfferBookingCategory =
        InstantBookOfferBookingCategory.BUSINESS;
    } else if (
      [
        reasonForTravelQuestionKnollcroftV3SocialOption.label,
        reasonForTravelQuestionKnollcroftV3OtherOption.label,
      ].includes(bookingCategoryQuestion.response as string)
    ) {
      instantBookOfferBookingCategory = InstantBookOfferBookingCategory.SOCIAL;
    } else {
      throw new Error("Booking category not recognized.");
    }

    let instantBookOffers: RenderableBifrostInstantBookOffer[];

    if (
      splitPaymentQuestion.response ===
      splitPaymentQuestionKnollcroftV3SplitPaymentOption.label
    ) {
      let calendarDateRanges: CalendarDateRange[] = [];

      const calendarDateRangeQuestion: FormQuestionWithResponse | undefined =
        questionsWithResponses.find(
          (questionWithResponse) =>
            questionWithResponse.formQuestionId ===
            selectedDatesQuestionKnollcroftV3.formQuestionId
        );

      if (calendarDateRangeQuestion) {
        calendarDateRanges = [
          calendarDateRangeQuestion.response as CalendarDateRange,
        ];
      }

      const calendarDatesRangeQuestion: FormQuestionWithResponse | undefined =
        questionsWithResponses.find(
          (questionWithResponse) =>
            questionWithResponse.formQuestionId ===
            potentialDatesQuestionKnollcroftV3.formQuestionId
        );

      if (calendarDatesRangeQuestion) {
        calendarDateRanges =
          calendarDatesRangeQuestion.response as CalendarDateRange[];
      }

      let flexibleDateDescription: string | undefined;

      const flexibleDateDescriptionQuestion:
        | FormQuestionWithResponse
        | undefined = questionsWithResponses.find(
        (questionWithResponse) =>
          questionWithResponse.formQuestionId ===
          undecidedDateDetailsQuestionKnollcroftV3.formQuestionId
      );

      if (flexibleDateDescriptionQuestion) {
        flexibleDateDescription =
          flexibleDateDescriptionQuestion.response as string;
      }

      ({ instantBookOffers } = await getSplitPayerInstantBookOffers({
        hotelId,
        bifrostTravelerId,
        bifrostFormId,
        localFormUserSessionId,
        userSessionId,
        formQuestionIdAndResponsePairs,
        bookingCategory: instantBookOfferBookingCategory,
        calendarDateRanges,
        flexibleDateDescription,
      }));
    } else {
      if (
        dateFlexibilityQuestion.response ===
        dateFlexibilityQuestionKnollcroftV3FirmDatesOption.label
      ) {
        const calendarDateRangeQuestion: FormQuestionWithResponse =
          questionsWithResponses.find(
            (questionWithResponse) =>
              questionWithResponse.formQuestionId ===
              selectedDatesQuestionKnollcroftV3.formQuestionId
          )!;

        ({ instantBookOffers } = await getSinglePayerFirmDateInstantBookOffers({
          hotelId,
          bifrostTravelerId,
          bifrostFormId,
          localFormUserSessionId,
          userSessionId,
          formQuestionIdAndResponsePairs,
          bookingCategory: instantBookOfferBookingCategory,
          calendarDateRange:
            calendarDateRangeQuestion.response as CalendarDateRange,
        }));
      } else if (
        dateFlexibilityQuestion.response ===
        dateFlexibilityQuestionKnollcroftV3FlexibleDatesOption.label
      ) {
        const calendarDatesRangeQuestion: FormQuestionWithResponse =
          questionsWithResponses.find(
            (questionWithResponse) =>
              questionWithResponse.formQuestionId ===
              potentialDatesQuestionKnollcroftV3.formQuestionId
          )!;

        ({ instantBookOffers } =
          await getSinglePayerFlexibleDateInstantBookOffers({
            hotelId,
            bifrostTravelerId,
            bifrostFormId,
            localFormUserSessionId,
            userSessionId,
            formQuestionIdAndResponsePairs,
            bookingCategory: instantBookOfferBookingCategory,
            calendarDateRanges:
              calendarDatesRangeQuestion.response as CalendarDateRange[],
          }));
      } else {
        const flexibleDateDescriptionQuestion: FormQuestionWithResponse =
          questionsWithResponses.find(
            (questionWithResponse) =>
              questionWithResponse.formQuestionId ===
              undecidedDateDetailsQuestionKnollcroftV3.formQuestionId
          )!;

        ({ instantBookOffers } =
          await getSinglePayerFlexibleDateInstantBookOffers({
            hotelId,
            bifrostTravelerId,
            bifrostFormId,
            localFormUserSessionId,
            userSessionId,
            formQuestionIdAndResponsePairs,
            bookingCategory: instantBookOfferBookingCategory,
            flexibleDateDescription:
              flexibleDateDescriptionQuestion.response as string,
          }));
      }
    }

    if (instantBookOffers.length === 0) {
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
        instantBookOffers,
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
