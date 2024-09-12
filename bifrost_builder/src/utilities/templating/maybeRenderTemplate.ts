import { getTemplateVariablesFromTemplate } from "@/utilities/templating/getTemplateVariablesFromTemplate";

interface MaybeRenderTemplateProps {
  template: string;
  templateData: Record<string, string>;
}

export const maybeRenderTemplate = ({
  template,
  templateData,
}: MaybeRenderTemplateProps): string | null => {
  const templateVariables: string[] = getTemplateVariablesFromTemplate({
    template,
  });

  if (templateVariables.length === 0) {
    return template;
  }

  const allTemplateVariableValuesAreAvailable: boolean =
    templateVariables.every((templateVariable: string): boolean => {
      return !!templateData[templateVariable];
    });

  if (!allTemplateVariableValuesAreAvailable) {
    return null;
  }

  return template.replace(
    /\{\{(\w+)\}\}/g,
    (match, key) => templateData[key] || match
  );
};
