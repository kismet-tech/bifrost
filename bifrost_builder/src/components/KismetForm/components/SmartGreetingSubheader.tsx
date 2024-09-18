import styled from "styled-components";
import { SmartGreetingSubheaderBlockConfiguration } from "../models";
import axios from "axios";
import { useEffect, useState } from "react";
import { getBifrostFormGreetingUrl } from "@/config";

export const SmartGreetingSubheaderWrapper = styled.div`
  font-size: 1.3rem; /* Equivalent to text-3xl */
`;

interface SmartGreetingSubheaderProps {
  configuration: SmartGreetingSubheaderBlockConfiguration;
  formState: Record<string, string>;
  maybeBifrostTravelerId?: string;
}

export function SmartGreetingSubheader({
  formState,
  maybeBifrostTravelerId,
}: SmartGreetingSubheaderProps) {
  const [text, updateText] = useState<string>("");

  useEffect(() => {
    async function setSmartingGreetingText() {
      const response = await axios.post(
        getBifrostFormGreetingUrl,
        {
          additionalDetails: formState.additionalDetails,
          bifrostTravelerId: maybeBifrostTravelerId,
          hotelName: "Knollcroft",
        },
        {}
      );

      if ("error" in response.data) {
        console.error(response.data.error.reason);
      }

      const greetingText = response.data.success.greetingText;
      updateText(greetingText);
    }

    setSmartingGreetingText();
  }, [maybeBifrostTravelerId, formState.additionalDetails]);

  return <SmartGreetingSubheaderWrapper>{text}</SmartGreetingSubheaderWrapper>;
}
