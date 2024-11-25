// src/contexts/BifrostFormStateProvider.tsx

import {
  createContext,
  MutableRefObject,
  ReactNode,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { BifrostFormState } from "../models";
import { FormQuestion } from "@/models/formQuestions/formQuestion";
import { getBagOfQuestions as getBagOfQuestionsForForm } from "../getBagOfQuestions";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import { deepEqual } from "@/utilities/core/deepEqual";
import {
  BagOfQuestions,
  FormQuestionId,
  FormQuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";
import { deleteResponsesToQuestionsWithMissingConditions } from "./deleteResponsesToQuestionsWithMissingConditions";
import { RenderableBifrostInstantBookOffer } from "@/api/instantBookOffers/models";
import { getBifrostTravelerId } from "@/contexts/BifrostFormStateProvider/utilities/getBifrostTravelerId";

export interface BifrostFormStateContextValue {
  getHotelId: () => string;

  getUserSessionId: () => string | undefined;
  setUserSessionId: ({ userSessionId }: { userSessionId: string }) => void;

  maybeGetBifrostTravelerId: () => string | undefined;
  setBifrostTravelerId: ({
    bifrostTravelerId,
  }: {
    bifrostTravelerId: string;
  }) => void;

  maybeGetBifrostFormId: () => string | undefined;
  setBifrostFormId: ({ bifrostFormId }: { bifrostFormId: string }) => void;

  maybeGetLocalFormUserSessionId: () => string | undefined;
  setLocalFormUserSessionId: ({
    localFormUserSessionId,
  }: {
    localFormUserSessionId: string;
  }) => void;

  maybeGetInstantBookOffers: () =>
    | RenderableBifrostInstantBookOffer[]
    | undefined;
  setInstantBookOffers: ({
    instantBookOffers,
  }: {
    instantBookOffers: RenderableBifrostInstantBookOffer[];
  }) => void;

  maybeGetProposedAlternativeDates: () => CalendarDateRange | undefined;
  setProposedAlternativeDates: ({
    calendarDateRange,
  }: {
    calendarDateRange: CalendarDateRange;
  }) => void;

  maybeGetFormQuestionByFormQuestionId: ({
    formQuestionId,
  }: {
    formQuestionId: FormQuestionId;
  }) => FormQuestion | undefined;

  maybeGetQuestionWithResponseByFormQuestionId: ({
    formQuestionId,
  }: {
    formQuestionId: FormQuestionId;
  }) => FormQuestionWithResponse | undefined;

  getQuestionsWithResponses: () => FormQuestionWithResponse[];

  setResponseToQuestion: ({
    questionWithResponse,
  }: {
    questionWithResponse: FormQuestionWithResponse;
  }) => void;

  deleteResponseToQuestion: ({
    formQuestionId,
  }: {
    formQuestionId: FormQuestionId;
  }) => void;

  deleteResponsesToQuestions: ({
    formQuestionIds,
  }: {
    formQuestionIds: FormQuestionId[];
  }) => void;

  getBagOfQuestions: () => BagOfQuestions;

  subscribeToQuestionsWithResponses: (
    callback: (newResponses: FormQuestionWithResponse[]) => void
  ) => () => void;
}

export const BifrostFormStateContext = createContext(
  {} as BifrostFormStateContextValue
);

interface BifrostSessionDataProviderProps {
  children: ReactNode;
}

export const BifrostFormStateProvider = ({
  children,
}: BifrostSessionDataProviderProps) => {
  const bifrostFormState: MutableRefObject<BifrostFormState> = useRef({
    hotelId: "mews-grand-hotel",
    bagOfQuestions: getBagOfQuestionsForForm(),
    questionsWithResponses: [],
  });

  const [
    questionsWithResponsesSubscribers,
    setQuestionsWithResponsesSubscribers,
  ] = useState<((responses: FormQuestionWithResponse[]) => void)[]>([]);

  useEffect(() => {
    const initializeBifrostTravelerId = async () => {
      if (!bifrostFormState.current.bifrostTravelerId) {
        const { bifrostTravelerId } = await getBifrostTravelerId();
        bifrostFormState.current.bifrostTravelerId = bifrostTravelerId;
      }
    };
    initializeBifrostTravelerId();
  }, []);

  // Memoize functions using useCallback
  const getHotelId = useCallback(
    (): string => bifrostFormState.current.hotelId,
    []
  );

  const getUserSessionId = useCallback((): string | undefined => {
    return bifrostFormState.current.userSessionId;
  }, []);

  const setUserSessionId = useCallback(
    ({ userSessionId }: { userSessionId: string }): void => {
      bifrostFormState.current.userSessionId = userSessionId;
    },
    []
  );

  const maybeGetBifrostTravelerId = useCallback(
    (): string | undefined => bifrostFormState.current.bifrostTravelerId,
    []
  );

  const setBifrostTravelerId = useCallback(
    ({ bifrostTravelerId }: { bifrostTravelerId: string }): void => {
      bifrostFormState.current.bifrostTravelerId = bifrostTravelerId;
    },
    []
  );

  const maybeGetBifrostFormId = useCallback(
    (): string | undefined => bifrostFormState.current.bifrostFormId,
    []
  );

  const setBifrostFormId = useCallback(
    ({ bifrostFormId }: { bifrostFormId: string }): void => {
      bifrostFormState.current.bifrostFormId = bifrostFormId;
    },
    []
  );

  const maybeGetLocalFormUserSessionId = useCallback(
    (): string | undefined => bifrostFormState.current.localFormUserSessionId,
    []
  );

  const setLocalFormUserSessionId = useCallback(
    ({ localFormUserSessionId }: { localFormUserSessionId: string }): void => {
      bifrostFormState.current.localFormUserSessionId = localFormUserSessionId;
    },
    []
  );

  const maybeGetInstantBookOffers = useCallback(
    (): RenderableBifrostInstantBookOffer[] | undefined =>
      bifrostFormState.current.renderableInstantOffers,
    []
  );

  const setInstantBookOffers = useCallback(
    ({
      instantBookOffers,
    }: {
      instantBookOffers: RenderableBifrostInstantBookOffer[];
    }): void => {
      bifrostFormState.current.renderableInstantOffers = instantBookOffers;
    },
    []
  );

  const maybeGetProposedAlternativeDates = useCallback(
    (): CalendarDateRange | undefined =>
      bifrostFormState.current.proposedAlternativeDates,
    []
  );

  const setProposedAlternativeDates = useCallback(
    ({ calendarDateRange }: { calendarDateRange: CalendarDateRange }): void => {
      bifrostFormState.current.proposedAlternativeDates = calendarDateRange;
    },
    []
  );

  const maybeGetFormQuestionByFormQuestionId = useCallback(
    ({
      formQuestionId,
    }: {
      formQuestionId: FormQuestionId;
    }): FormQuestion | undefined => {
      const formQuestion: FormQuestion | undefined =
        bifrostFormState.current.bagOfQuestions
          .map((formQuestionGroup) => formQuestionGroup.formQuestions)
          .flat()
          .find(
            (formQuestion) => formQuestion.formQuestionId === formQuestionId
          );

      return formQuestion;
    },
    []
  );

  const maybeGetQuestionWithResponseByFormQuestionId = useCallback(
    ({
      formQuestionId,
    }: {
      formQuestionId: FormQuestionId;
    }): FormQuestionWithResponse | undefined => {
      const maybeQuestionWithResponse: FormQuestionWithResponse | undefined =
        bifrostFormState.current.questionsWithResponses.find(
          (questionWithResponse: FormQuestionWithResponse) => {
            return questionWithResponse.formQuestionId === formQuestionId;
          }
        );

      return maybeQuestionWithResponse;
    },
    []
  );

  const getQuestionsWithResponses = useCallback(
    (): FormQuestionWithResponse[] =>
      bifrostFormState.current.questionsWithResponses,
    []
  );

  const notifySubscribers = useCallback(() => {
    questionsWithResponsesSubscribers.forEach((callback) =>
      callback(bifrostFormState.current.questionsWithResponses)
    );
  }, [questionsWithResponsesSubscribers]);

  const subscribeToQuestionsWithResponses = useCallback(
    (callback: (newResponses: FormQuestionWithResponse[]) => void) => {
      setQuestionsWithResponsesSubscribers((prev) => [...prev, callback]);
      return () =>
        setQuestionsWithResponsesSubscribers((prev) =>
          prev.filter((sub) => sub !== callback)
        );
    },
    []
  );

  const setResponseToQuestion = useCallback(
    ({
      questionWithResponse,
    }: {
      questionWithResponse: FormQuestionWithResponse;
    }): void => {
      const currentResponses = bifrostFormState.current.questionsWithResponses;

      let updatedFormQuestionWithResponse = currentResponses.some(
        (existingResponse) =>
          existingResponse.formQuestionId ===
          questionWithResponse.formQuestionId
      )
        ? currentResponses.map((existingResponse) =>
            existingResponse.formQuestionId ===
            questionWithResponse.formQuestionId
              ? questionWithResponse
              : existingResponse
          )
        : [...currentResponses, questionWithResponse];

      updatedFormQuestionWithResponse =
        deleteResponsesToQuestionsWithMissingConditions({
          formQuestionsWithResponses: updatedFormQuestionWithResponse,
          bagOfQuestions: bifrostFormState.current.bagOfQuestions,
        });

      if (!deepEqual(updatedFormQuestionWithResponse, currentResponses)) {
        bifrostFormState.current.questionsWithResponses =
          updatedFormQuestionWithResponse;
        notifySubscribers();
      }
    },
    [notifySubscribers]
  );

  const deleteResponseToQuestion = useCallback(
    ({ formQuestionId }: { formQuestionId: FormQuestionId }): void => {
      let updatedFormQuestionWithResponse =
        bifrostFormState.current.questionsWithResponses.filter(
          (questionWithResponse: FormQuestionWithResponse) =>
            questionWithResponse.formQuestionId !== formQuestionId
        );

      updatedFormQuestionWithResponse =
        deleteResponsesToQuestionsWithMissingConditions({
          formQuestionsWithResponses: updatedFormQuestionWithResponse,
          bagOfQuestions: bifrostFormState.current.bagOfQuestions,
        });

      if (
        !deepEqual(
          updatedFormQuestionWithResponse,
          bifrostFormState.current.questionsWithResponses
        )
      ) {
        bifrostFormState.current.questionsWithResponses =
          updatedFormQuestionWithResponse;
        notifySubscribers();
      }
    },
    [notifySubscribers]
  );

  const deleteResponsesToQuestions = useCallback(
    ({ formQuestionIds }: { formQuestionIds: FormQuestionId[] }): void => {
      let updatedFormQuestionWithResponse: FormQuestionWithResponse[] =
        bifrostFormState.current.questionsWithResponses.filter(
          (questionWithResponse: FormQuestionWithResponse) =>
            !formQuestionIds.includes(questionWithResponse.formQuestionId)
        );

      updatedFormQuestionWithResponse =
        deleteResponsesToQuestionsWithMissingConditions({
          formQuestionsWithResponses: updatedFormQuestionWithResponse,
          bagOfQuestions: bifrostFormState.current.bagOfQuestions,
        });

      if (
        !deepEqual(
          updatedFormQuestionWithResponse,
          bifrostFormState.current.questionsWithResponses
        )
      ) {
        bifrostFormState.current.questionsWithResponses =
          updatedFormQuestionWithResponse;
        notifySubscribers();
      }
    },
    [notifySubscribers]
  );

  const getBagOfQuestions = useCallback((): BagOfQuestions => {
    return bifrostFormState.current.bagOfQuestions;
  }, []);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      getHotelId,
      getUserSessionId,
      setUserSessionId,

      maybeGetBifrostTravelerId,
      setBifrostTravelerId,

      maybeGetBifrostFormId,
      setBifrostFormId,

      maybeGetLocalFormUserSessionId,
      setLocalFormUserSessionId,

      maybeGetInstantBookOffers,
      setInstantBookOffers,
      maybeGetProposedAlternativeDates,
      setProposedAlternativeDates,
      maybeGetFormQuestionByFormQuestionId,
      maybeGetQuestionWithResponseByFormQuestionId,
      getQuestionsWithResponses,
      subscribeToQuestionsWithResponses,
      setResponseToQuestion,
      deleteResponseToQuestion,
      deleteResponsesToQuestions,
      getBagOfQuestions,
    }),
    [
      getHotelId,
      getUserSessionId,
      setUserSessionId,

      maybeGetBifrostTravelerId,
      setBifrostTravelerId,

      maybeGetBifrostFormId,
      setBifrostFormId,

      maybeGetLocalFormUserSessionId,
      setLocalFormUserSessionId,

      maybeGetInstantBookOffers,
      setInstantBookOffers,
      maybeGetProposedAlternativeDates,
      setProposedAlternativeDates,
      maybeGetFormQuestionByFormQuestionId,
      maybeGetQuestionWithResponseByFormQuestionId,
      getQuestionsWithResponses,
      subscribeToQuestionsWithResponses,
      setResponseToQuestion,
      deleteResponseToQuestion,
      deleteResponsesToQuestions,
      getBagOfQuestions,
    ]
  );

  return (
    <BifrostFormStateContext.Provider value={contextValue}>
      {children}
    </BifrostFormStateContext.Provider>
  );
};
