import { getBifrostFormGreeting } from "@/api/getBifrostFormGreeting";
import { SmartGreetingSubheaderUIBlockConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  font-size: 1.3rem; /* Equivalent to text-3xl */
`;

interface SmartGreetingSubheaderUIBlockProps {
  configuration: SmartGreetingSubheaderUIBlockConfiguration;
  hotelId: string;
  formData: BifrostFormData;
  bifrostTravelerId: string;
}

export function SmartGreetingSubheaderUIBlock({
  configuration: { formGreetingDataKeyPath },
  hotelId,
  formData,
  bifrostTravelerId,
}: SmartGreetingSubheaderUIBlockProps) {
  const [text, updateText] = useState<string>("");

  useEffect(() => {
    async function setSmartingGreetingText() {
      const response = await getBifrostFormGreeting({
        hotelId,
        bifrostTravelerId,
        additionalDetails: formData[formGreetingDataKeyPath] as string,
      });

      if ("error" in response.data) {
        console.error(response.data.error.reason);
      }

      const greetingText = response.data.success.greetingText;
      updateText(greetingText);
    }

    setSmartingGreetingText();
  }, [hotelId, bifrostTravelerId, formData, formGreetingDataKeyPath]);

  return <Wrapper>{text}</Wrapper>;
}
