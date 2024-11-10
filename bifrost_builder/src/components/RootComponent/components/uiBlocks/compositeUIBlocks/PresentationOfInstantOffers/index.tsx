import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { SinglePayerPresentationOfInstantOffers } from "./SinglePayerPresentationOfInstantOffers";
import { SplitPayerPresentationOfInstantOffers } from "./SplitPayerPresentationOfInstantOffers";
import {
  splitPaymentQuestionKnollcroftV3,
  splitPaymentQuestionKnollcroftV3SplitPaymentOption,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestAndPaymentQuestionGroupKnollcroftV3";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface InstantOfferUIBlockProps {}

export function PresentationOfInstantOffersUIBlock({}: InstantOfferUIBlockProps) {
  const {
    maybeGetInstantBookOffers,
    maybeGetQuestionWithResponseByFormQuestionId,
  } = useBifrostFormState();

  const renderableInstantOffers =
    maybeGetInstantBookOffers() as RenderableBifrostInstantBookOffer[];

  const maybeSplitPaymentQuestionWithResponse:
    | QuestionWithResponse
    | undefined = maybeGetQuestionWithResponseByFormQuestionId({
    formQuestionId: splitPaymentQuestionKnollcroftV3.formQuestionId,
  });

  const guestPaySeparately: boolean =
    maybeSplitPaymentQuestionWithResponse?.response ===
    splitPaymentQuestionKnollcroftV3SplitPaymentOption.label;

  if (guestPaySeparately) {
    return (
      <SplitPayerPresentationOfInstantOffers
        renderableInstantOffers={renderableInstantOffers}
      />
    );
  } else {
    return (
      <SinglePayerPresentationOfInstantOffers
        renderableInstantOffers={renderableInstantOffers}
      />
    );
  }
}
