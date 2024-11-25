import {
  ItinerarySummaryHeaderUIBlockField,
  ItinerarySummaryHeaderUIBlockFieldIcon,
  ScreenConfiguration,
} from "@/models/configuration";
import { maybeRenderTemplate } from "@/utilities/templating/maybeRenderTemplate";
import { Calendar, Hotel } from "lucide-react";
import { handleGoToUpdateItineraryField } from "./handleGoToUpdateItineraryField";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import ConciergeBell from "./ConciergeBell.svg";
import {
  BagOfQuestions,
  FormQuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";
import { RenderableBifrostInstantBookOffer } from "@/api/instantBookOffers/models";

interface ItinerarySummaryHeaderFieldProps {
  field: ItinerarySummaryHeaderUIBlockField;

  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  bagOfQuestions: BagOfQuestions;

  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  setUserSessionId: ({ userSessionId }: { userSessionId: string }) => void;
  setInstantBookOffers: ({
    instantBookOffers,
  }: {
    instantBookOffers: RenderableBifrostInstantBookOffer[];
  }) => void;
  maybeGetQuestionWithResponseByFormQuestionId: ({
    formQuestionId,
  }: {
    formQuestionId: string;
  }) => FormQuestionWithResponse | undefined;
  getQuestionsWithResponses: () => FormQuestionWithResponse[];
  setProposedAlternativeDates: ({
    calendarDateRange,
  }: {
    calendarDateRange: CalendarDateRange;
  }) => void;
}

export function ItinerarySummaryHeaderField({
  field,

  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  bagOfQuestions,

  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  setUserSessionId,
  setInstantBookOffers,
  maybeGetQuestionWithResponseByFormQuestionId,
  getQuestionsWithResponses,
  setProposedAlternativeDates,
}: ItinerarySummaryHeaderFieldProps) {
  let icon;

  if (field.icon === ItinerarySummaryHeaderUIBlockFieldIcon.BUILDING) {
    icon = <Hotel />;
  } else if (field.icon === ItinerarySummaryHeaderUIBlockFieldIcon.CALENDAR) {
    icon = <Calendar />;
  } else if (field.icon === ItinerarySummaryHeaderUIBlockFieldIcon.BELL) {
    icon = (
      <img
        src={ConciergeBell}
        alt="Concierge Bell"
        className="p-2 cursor-pointer"
      />
    );
  }

  const maybeRenderedTemplate: string | null = maybeRenderTemplate({
    template: field.template,
    maybeGetQuestionWithResponseByFormQuestionId,
  });

  return (
    <div key={field.template} className="flex items-center space-x-2">
      <div>{icon}</div>
      <div className="text-sm">
        <div>{maybeRenderedTemplate ? maybeRenderedTemplate : ""}</div>
        <div
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault();
            if (field.formQuestionId) {
              handleGoToUpdateItineraryField({
                targetFormQuestionId: field.formQuestionId,
                hotelId,
                bifrostTravelerId,
                bifrostFormId,
                localFormUserSessionId,
                bagOfQuestions,

                pushScreenConfigurationStack,
                popRightscreenConfigurationStack,
                setUserSessionId,
                setInstantBookOffers,
                maybeGetQuestionWithResponseByFormQuestionId,
                getQuestionsWithResponses,
                setProposedAlternativeDates,
              });
            }
          }}
          className="underline cursor-pointer"
        >
          {field.updateDataLabel}
        </div>
      </div>
    </div>
  );
}
