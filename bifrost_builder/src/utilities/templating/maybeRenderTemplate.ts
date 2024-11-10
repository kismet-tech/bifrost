import { getTemplateVariablesFromTemplate } from "@/utilities/templating/getTemplateVariablesFromTemplate";
import { renderCompactCalendarDateRange } from "../formatting/renderCompactCalendarDateRange";
import {
  QuestionWithResponse,
  QuestionResponseType,
} from "@/models/formQuestions/questionWithResponse";

interface MaybeRenderTemplateProps {
  template: string;
  maybeGetQuestionWithResponseByFormQuestionId: ({
    formQuestionId,
  }: {
    formQuestionId: string;
  }) => QuestionWithResponse | undefined;
}

export const maybeRenderTemplate = ({
  template,
  maybeGetQuestionWithResponseByFormQuestionId,
}: MaybeRenderTemplateProps): string | null => {
  const templateVariables: string[] = getTemplateVariablesFromTemplate({
    template,
  });

  console.log(`templateVariables: ${JSON.stringify(templateVariables)}`);

  if (templateVariables.length === 0) {
    return template;
  }

  const templateVariableToResponseMap: Map<string, string | undefined> =
    new Map();

  templateVariables.forEach((templateVariable: string) => {
    const maybeQuestionWithResponse =
      maybeGetQuestionWithResponseByFormQuestionId({
        formQuestionId: templateVariable,
      });

    console.log(
      `templateVariable: ${templateVariable} | maybeQuestionWithResponse: ${JSON.stringify(
        maybeQuestionWithResponse
      )}`
    );

    if (
      maybeQuestionWithResponse?.responseType === QuestionResponseType.STRING
    ) {
      templateVariableToResponseMap.set(
        templateVariable,
        maybeQuestionWithResponse.response
      );
    } else if (
      maybeQuestionWithResponse?.responseType ===
      QuestionResponseType.CALENDAR_DATE_RANGE
    ) {
      templateVariableToResponseMap.set(
        templateVariable,
        renderCompactCalendarDateRange({
          calendarDateRange: maybeQuestionWithResponse.response,
        })
      );
    } else {
      templateVariableToResponseMap.set(templateVariable, undefined);
    }
  });

  console.log(
    `templateVariableToResponseMap: ${JSON.stringify(
      Array.from(templateVariableToResponseMap)
    )}`
  );

  const allTemplateVariableValuesAreAvailable = Array.from(
    templateVariableToResponseMap.values()
  ).every((value) => !!value);

  console.log(
    `allTemplateVariableValuesAreAvailable: ${allTemplateVariableValuesAreAvailable}`
  );

  if (!allTemplateVariableValuesAreAvailable) {
    return null;
  }

  const renderedTemplate: string = template.replace(
    /\{\{([^}]+)\}\}/g,
    (_, key) => templateVariableToResponseMap.get(key) as string
  );

  return renderedTemplate;
};
