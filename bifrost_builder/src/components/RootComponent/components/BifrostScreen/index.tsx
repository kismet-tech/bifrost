import { ScreenConfiguration } from "@/models/configuration";
import styled from "styled-components";
import { LayoutBlock } from "../layoutBlocks/LayoutBlock";

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
}

export function BifrostScreen({
  screenConfiguration: { layout },
}: BifrostScreenProps) {
  return (
    <Wrapper>
      <LayoutBlock layoutBlockConfiguration={layout} />
    </Wrapper>
  );
}
