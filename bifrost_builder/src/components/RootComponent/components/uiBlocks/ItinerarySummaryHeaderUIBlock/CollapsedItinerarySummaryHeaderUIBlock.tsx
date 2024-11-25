import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import {
  ItinerarySummaryHeaderUIBlockConfiguration,
  ItinerarySummaryHeaderUIBlockField,
  ScreenConfiguration,
} from "@/models/configuration";
import { ItinerarySummaryHeaderField } from "./ItinerarySummaryHeaderField";
import { BagOfQuestions } from "@/models/formQuestions/questionWithResponse";

interface CollapsedItinerarySummaryHeaderUIBlockProps {
  configuration: ItinerarySummaryHeaderUIBlockConfiguration;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
}

export function CollapsedItinerarySummaryHeaderUIBlock({
  configuration: { fields },
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
}: CollapsedItinerarySummaryHeaderUIBlockProps) {
  const {
    getHotelId,
    maybeGetQuestionWithResponseByFormQuestionId,
    maybeGetBifrostTravelerId,
    maybeGetBifrostFormId,
    maybeGetLocalFormUserSessionId,
    getQuestionsWithResponses,
    setProposedAlternativeDates,
    setUserSessionId,
    setInstantBookOffers,
    getBagOfQuestions,
  } = useBifrostFormState();

  const hotelId: string = getHotelId();

  const bifrostTravelerId: string = maybeGetBifrostTravelerId() as string;

  const bifrostFormId: string = maybeGetBifrostFormId() as string;

  const localFormUserSessionId: string =
    maybeGetLocalFormUserSessionId() as string;

  const bagOfQuestions: BagOfQuestions = getBagOfQuestions();

  return (
    <>
      <div className="text-lg font-semibold mb-2">Itinerary name</div>
      <div className="flex space-x-4">
        {fields.map((field: ItinerarySummaryHeaderUIBlockField) => {
          return (
            <ItinerarySummaryHeaderField
              key={field.formQuestionId}
              field={field}
              hotelId={hotelId}
              bifrostTravelerId={bifrostTravelerId}
              bifrostFormId={bifrostFormId}
              localFormUserSessionId={localFormUserSessionId}
              bagOfQuestions={bagOfQuestions}
              pushScreenConfigurationStack={pushScreenConfigurationStack}
              popRightscreenConfigurationStack={
                popRightscreenConfigurationStack
              }
              setUserSessionId={setUserSessionId}
              setInstantBookOffers={setInstantBookOffers}
              maybeGetQuestionWithResponseByFormQuestionId={
                maybeGetQuestionWithResponseByFormQuestionId
              }
              getQuestionsWithResponses={getQuestionsWithResponses}
              setProposedAlternativeDates={setProposedAlternativeDates}
            />
          );
        })}
      </div>
    </>
  );
}
