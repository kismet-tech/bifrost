import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { generateLayoutBlockConfigurationFromQuestion } from "@/getBifrostConfiguration/formQuestions/generateNextScreenConfiguration/generateLayoutBlockConfigurationFromQuestion";
import { UIBlockConfiguration } from "@/models/configuration";
import { UIBlock } from "../../../UIBlock";
import { FormQuestion } from "@/models/formQuestions/formQuestion";
import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface ExpandedItinerarySummaryHeaderItineraryBodyProps {}

export function ExpandedItinerarySummaryHeaderItineraryBody({}: ExpandedItinerarySummaryHeaderItineraryBodyProps) {
  const { maybeGetFormQuestionByFormQuestionId, getQuestionsWithResponses } =
    useBifrostFormState();

  const questionsWithResponses: FormQuestionWithResponse[] =
    getQuestionsWithResponses();

  const questionBlockConfigurations: UIBlockConfiguration[] =
    questionsWithResponses.map(
      (questionWithResponse: FormQuestionWithResponse) => {
        const formQuestion = maybeGetFormQuestionByFormQuestionId({
          formQuestionId: questionWithResponse.formQuestionId,
        }) as FormQuestion;

        return generateLayoutBlockConfigurationFromQuestion({
          formQuestion,
        });
      }
    );

  console.log(
    `questionsWithResponses: ${JSON.stringify(questionsWithResponses, null, 4)}`
  );

  const renderedQuestions: JSX.Element[] = questionBlockConfigurations.map(
    (questionBlockConfiguration: UIBlockConfiguration) => {
      return (
        <UIBlock
          configuration={questionBlockConfiguration}
          handleSubmitFormData={function (): Promise<void> {
            throw new Error("Function not implemented.");
          }}
          screenConfigurationStack={[]}
          pushScreenConfigurationStack={function (): void {
            throw new Error("Function not implemented.");
          }}
          popRightscreenConfigurationStack={function (): void {
            throw new Error("Function not implemented.");
          }}
          registerBifrostFormInput={function (): Promise<void> {
            throw new Error("Function not implemented.");
          }}
        />
      );
    }
  );

  return <div>{renderedQuestions}</div>;
}
