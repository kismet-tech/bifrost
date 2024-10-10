import styled from "styled-components";
import { BifrostFormData } from "@/models/configuration/formData";
import { HeaderUIBlockConfiguration } from "@/models/configuration";
import { maybeRenderTemplate } from "@/utilities/templating/maybeRenderTemplate";

export const Wraper = styled.div`
  font-size: 2rem;
`;

interface HeaderUIBlockProps {
  configuration: HeaderUIBlockConfiguration;
  formData: BifrostFormData;
}

export function HeaderUIBlock({ configuration, formData }: HeaderUIBlockProps) {
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
