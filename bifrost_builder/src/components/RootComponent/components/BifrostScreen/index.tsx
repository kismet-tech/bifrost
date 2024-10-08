import { ScreenConfiguration } from "@/models/configuration";
import styled from "styled-components";
import { LayoutBlock } from "../layoutBlocks/LayoutBlock";
import {
  BifrostFormData,
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50vw;
  margin: 0 auto;
  padding: 2rem; /* Add padding around the form */
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem; /* Adjust padding for smaller screens */
  }
`;

interface BifrostScreenProps {
  screenConfiguration: ScreenConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  handleSetFormData: ({
    keyPath,
    keyValue,
  }: {
    keyPath: BifrostKeyPath;
    keyValue: BifrostFormDataValue;
  }) => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function BifrostScreen({
  screenConfiguration: { layout },
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: BifrostScreenProps) {
  return (
    <Wrapper>
      <LayoutBlock
        layoutBlockConfiguration={layout}
        keyPath={keyPath}
        formData={formData}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        handleSetFormData={handleSetFormData}
        pushScreenConfigurationStack={pushScreenConfigurationStack}
        popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        registerBifrostFormInput={registerBifrostFormInput}
        handleSubmitFormData={handleSubmitFormData}
      />
    </Wrapper>
  );
}
