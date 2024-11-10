// src/contexts/useBifrostFormState.tsx

import { useContext, useEffect, useState } from "react";
import {
  BifrostFormStateContext,
  BifrostFormStateContextValue,
} from "./BifrostFormStateProvider";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

export const useBifrostFormState = () => {
  const context: BifrostFormStateContextValue = useContext(
    BifrostFormStateContext
  );

  const [questionsWithResponses, setQuestionsWithResponses] = useState<
    QuestionWithResponse[]
  >(context.getQuestionsWithResponses());

  // Watch for updates in the context's questionsWithResponses and update local state
  useEffect(() => {
    const unsubscribe = context.subscribeToQuestionsWithResponses(
      setQuestionsWithResponses
    );
    return unsubscribe;
  }, [context.subscribeToQuestionsWithResponses]);

  return { ...context, questionsWithResponses };
};
