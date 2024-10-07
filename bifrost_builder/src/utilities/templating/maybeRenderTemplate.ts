import { BifrostFormData } from "@/models/configuration/formData";
import { getTemplateVariablesFromTemplate } from "@/utilities/templating/getTemplateVariablesFromTemplate";

interface MaybeRenderTemplateProps {
  template: string;
  formData: BifrostFormData;
}

export const maybeRenderTemplate = ({
  template,
  formData,
}: MaybeRenderTemplateProps): string | null => {
  const templateVariables: string[] = getTemplateVariablesFromTemplate({
    template,
  });

  if (templateVariables.length === 0) {
    return template;
  }

  const allTemplateVariableValuesAreAvailable: boolean =
    templateVariables.every((templateVariable: string): boolean => {
      return !!formData[templateVariable];
    });

  if (!allTemplateVariableValuesAreAvailable) {
    return null;
  }

  return template.replace(/\{\{(\w+)\}\}/g, (match, key) =>
    typeof formData[key] === "string" ? formData[key] : match
  );
};
