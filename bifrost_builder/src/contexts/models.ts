import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import {
  BagOfQuestions,
  QuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";

export interface BifrostFormState {
  hotelId: string;

  bagOfQuestions: BagOfQuestions;
  questionsWithResponses: QuestionWithResponse[];

  userSessionId?: string;
  bifrostTravelerId?: string;
  bifrostFormId?: string;
  localFormUserSessionId?: string;

  proposedAlternativeDates?: CalendarDateRange;
  renderableInstantOffers?: RenderableBifrostInstantBookOffer[];
}
