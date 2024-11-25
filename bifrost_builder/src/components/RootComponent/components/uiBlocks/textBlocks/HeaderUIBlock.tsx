import styled from "styled-components";
import { HeaderUIBlockConfiguration } from "@/models/configuration";
import { maybeRenderTemplate } from "@/utilities/templating/maybeRenderTemplate";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";

export const Wraper = styled.div`
  font-size: 2rem;
`;

interface HeaderUIBlockProps {
  configuration: HeaderUIBlockConfiguration;
}

export function HeaderUIBlock({ configuration }: HeaderUIBlockProps) {
  let text: string;

  const { maybeGetQuestionWithResponseByFormQuestionId } =
    useBifrostFormState();

  if (configuration.templateText) {
    const maybeRenderedTemplate: string | null = maybeRenderTemplate({
      template: configuration.templateText,
      maybeGetQuestionWithResponseByFormQuestionId,
    });

    if (maybeRenderedTemplate) {
      text = maybeRenderedTemplate;
    } else {
      text = configuration.backupText;
    }
  } else {
    text = configuration.backupText;
  }

  return <Wraper>{text}</Wraper>;
}
