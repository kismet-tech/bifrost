interface GetTemplateVariablesFromTemplateProps {
  template: string;
}

export const getTemplateVariablesFromTemplate = ({
  template,
}: GetTemplateVariablesFromTemplateProps): string[] => {
  const regex = /\{\{([^}]+)\}\}/g;
  const templateVariables: string[] = [];
  let match;

  while ((match = regex.exec(template)) !== null) {
    templateVariables.push(match[1].trim());
  }

  return templateVariables;
};
