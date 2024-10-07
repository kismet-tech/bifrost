import styled from "styled-components";
import { HeaderBlockConfiguration } from "../../models";
import { maybeRenderTemplate } from "@/utilities/templating/maybeRenderTemplate";

export const FormHeaderWraper = styled.div`
  font-size: 2rem;
`;

interface FormHeaderProps {
  configuration: HeaderBlockConfiguration;
  formState: Record<string, string>;
}

export function FormHeader({ configuration, formState }: FormHeaderProps) {
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

  return <FormHeaderWraper>{text}</FormHeaderWraper>;
}
