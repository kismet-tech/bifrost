import styled from "styled-components";
import { SmartGreetingSubheaderBlockConfiguration } from "../models";
import axios from "axios";
import { useEffect, useState } from "react";

export const SmartGreetingSubheaderWrapper = styled.div`
  font-size: 1.3rem; /* Equivalent to text-3xl */
  font-family: barlow-regular, "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

interface SmartGreetingSubheaderProps {
  configuration: SmartGreetingSubheaderBlockConfiguration;
  formState: Record<string, string>;
}

export function SmartGreetingSubheader({
  //   configuration,
  formState,
}: SmartGreetingSubheaderProps) {
  const [text, updateText] = useState<string>("");

  useEffect(() => {
    async function setSmartingGreetingText() {
      const apiBaseUrl = "https://api.makekismet.com";

      const response = await axios.post(
        `${apiBaseUrl}/Bifrost/GetGreeting`,
        {
          additionalDetails: formState.additionalDetails,
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
  }, [formState.additionalDetails]);

  return <SmartGreetingSubheaderWrapper>{text}</SmartGreetingSubheaderWrapper>;
}
