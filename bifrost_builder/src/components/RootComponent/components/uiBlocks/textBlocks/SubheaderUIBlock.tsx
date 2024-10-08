import { SubheaderUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { maybeRenderTemplate } from "@/utilities/templating/maybeRenderTemplate";
import styled from "styled-components";

export const Wraper = styled.div`
  font-size: 1.2rem;
`;

interface SubheaderUIBlockProps {
  configuration: SubheaderUIBlockConfiguration;
  formData: BifrostFormData;
}

export function SubheaderUIBlock({
  configuration,
  formData,
}: SubheaderUIBlockProps) {
  let text: string;

  if (configuration.templateText) {
    const maybeRenderedTemplate: string | null = maybeRenderTemplate({
      template: configuration.templateText,
      formData,
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
