import { ScreenConfiguration } from "@/models/configuration";
import styled from "styled-components";
import { LayoutBlock } from "../layoutBlocks/LayoutBlock";
import { BifrostFormData } from "@/models/configuration/formData";

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
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  handleSetFormData: ({
    keyName,
    keyValue,
  }: {
    keyName: string;
    keyValue: string;
  }) => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function BifrostScreen({
  screenConfiguration: { layout },
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  registerBifrostFormInput,
  handleSubmitFormData,
}: BifrostScreenProps) {
  return (
    <Wrapper>
      <LayoutBlock
        layoutBlockConfiguration={layout}
        formData={formData}
        hotelId={hotelId}
        bifrostTravelerId={bifrostTravelerId}
        handleSetFormData={handleSetFormData}
        registerBifrostFormInput={registerBifrostFormInput}
        handleSubmitFormData={handleSubmitFormData}
      />
    </Wrapper>
  );
}
