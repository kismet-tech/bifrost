import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { SubheaderUIBlockConfiguration } from "@/models/configuration";
import { maybeRenderTemplate } from "@/utilities/templating/maybeRenderTemplate";
import styled from "styled-components";

export const Wraper = styled.div`
  font-size: 1.2rem;
`;

interface SubheaderUIBlockProps {
  configuration: SubheaderUIBlockConfiguration;
}

export function SubheaderUIBlock({ configuration }: SubheaderUIBlockProps) {
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
