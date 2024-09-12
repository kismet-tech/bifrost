import styled from "styled-components";
import { SubheaderBlockConfiguration } from "../models";
import { maybeRenderTemplate } from "@/utilities/templating/maybeRenderTemplate";

export const FormSubheaderWrapper = styled.div`
  font-size: 1.3rem; /* Equivalent to text-3xl */
  font-family: barlow-regular, "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

interface FormSubheaderProps {
  configuration: SubheaderBlockConfiguration;
  formState: Record<string, string>;
}

export function FormSubheader({
  configuration,
  formState,
}: FormSubheaderProps) {
  let text: string;

  if (configuration.templateText) {
    const maybeRenderedTemplate: string | null = maybeRenderTemplate({
      template: configuration.templateText,
      templateData: formState,
    });

    if (maybeRenderedTemplate) {
      text = maybeRenderedTemplate;
    } else {
      text = configuration.backupText;
    }
  } else {
    text = configuration.backupText;
  }

  return <FormSubheaderWrapper>{text}</FormSubheaderWrapper>;
}
