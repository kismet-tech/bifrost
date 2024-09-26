import styled from "styled-components";
import { useEffect, useState } from "react";
import { SmartFarewellSubheaderBlockConfiguration } from "../../models";
import { getBifrostFormFarewellMessage } from "@/api/getBifrostFormFarewellMessage";

export const SmartFarewellSubheaderWrapper = styled.div`
  font-size: 1.3rem; /* Equivalent to text-3xl */
`;

interface SmartFarewellSubheaderProps {
  configuration: SmartFarewellSubheaderBlockConfiguration;
  hotelId: string;
  formState: Record<string, string>;
  bifrostTravelerId: string;
}

export function SmartFarewellSubheader({
  hotelId,
  formState,
  bifrostTravelerId,
}: SmartFarewellSubheaderProps) {
  const [text, updateText] = useState<string>("");

  useEffect(() => {
    async function setSmartingGreetingText() {
      const { farewellText } = await getBifrostFormFarewellMessage({
        hotelId,
        bifrostTravelerId,
        formData: formState,
      });

      updateText(farewellText);
    }

    setSmartingGreetingText();
  }, [hotelId, bifrostTravelerId, formState]);

  return <SmartFarewellSubheaderWrapper>{text}</SmartFarewellSubheaderWrapper>;
}
