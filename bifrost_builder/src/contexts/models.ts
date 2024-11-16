import { RenderableBifrostInstantBookOffer } from "@/api/instantBookOffers/models";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import {
  BagOfQuestions,
  FormQuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";

export interface BifrostFormState {
  hotelId: string;

  bagOfQuestions: BagOfQuestions;
  questionsWithResponses: FormQuestionWithResponse[];

  userSessionId?: string;
  bifrostTravelerId?: string;
  bifrostFormId?: string;
  localFormUserSessionId?: string;

  proposedAlternativeDates?: CalendarDateRange;
  renderableInstantOffers?: RenderableBifrostInstantBookOffer[];
}
