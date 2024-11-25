import {
  ItinerarySummaryHeaderUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import { ExpandedItinerarySummaryHeaderBody } from "./ExpandedItinerarySummaryHeaderBody";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { ItinerarySummaryHeaderField } from "../ItinerarySummaryHeaderField";
import { BagOfQuestions } from "@/models/formQuestions/questionWithResponse";

interface ExpandedItinerarySummaryHeaderUIBlockProps {
  configuration: ItinerarySummaryHeaderUIBlockConfiguration;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
}

export function ExpandedItinerarySummaryHeaderUIBlock({
  configuration: { fields },
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
}: ExpandedItinerarySummaryHeaderUIBlockProps) {
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
    <div>
      <div>
        <div className="text-lg font-semibold mb-4">Itinerary name</div>

        <div className="flex">
          {/* Hotel Image */}
          <img
            src="https://www.bestambiance.com/wp-content/uploads/2022/09/cwo4c5et7jyz-aspect-ratio-800-800.jpg"
            alt="Hotel"
            className="w-32 h-32 object-cover rounded mr-4"
          />

          {/* Fields */}
          <div className="flex flex-col justify-center">
            {fields.map((field) => {
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
        </div>
      </div>

      <div className="pt-4">
        <ExpandedItinerarySummaryHeaderBody />
      </div>
    </div>
  );
}
