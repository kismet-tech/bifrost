import styled from "styled-components";
import { SmartGreetingSubheaderBlockConfiguration } from "../models";
import { useEffect, useState } from "react";
import { getBifrostFormGreeting } from "@/api/getBifrostFormGreeting";

export const SmartGreetingSubheaderWrapper = styled.div`
  font-size: 1.3rem; /* Equivalent to text-3xl */
`;

interface SmartGreetingSubheaderProps {
  configuration: SmartGreetingSubheaderBlockConfiguration;
  hotelId: string;
  formState: Record<string, string>;
  bifrostTravelerId: string;
}

export function SmartGreetingSubheader({
  hotelId,
  formState,
  bifrostTravelerId,
}: SmartGreetingSubheaderProps) {
  const [text, updateText] = useState<string>("");

  useEffect(() => {
    async function setSmartingGreetingText() {
      const response = await getBifrostFormGreeting({
        hotelId,
        bifrostTravelerId,
        additionalDetails: formState.additionalDetails,
      });

      if ("error" in response.data) {
        console.error(response.data.error.reason);
      }

      const greetingText = response.data.success.greetingText;
      updateText(greetingText);
    }

    setSmartingGreetingText();
  }, [hotelId, bifrostTravelerId, formState.additionalDetails]);

  return <SmartGreetingSubheaderWrapper>{text}</SmartGreetingSubheaderWrapper>;
}
