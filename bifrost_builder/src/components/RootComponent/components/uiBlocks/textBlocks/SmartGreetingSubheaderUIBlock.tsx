import { getBifrostFormGreeting } from "@/api/getBifrostFormGreeting";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { SmartGreetingSubheaderUIBlockConfiguration } from "@/models/configuration";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  font-size: 1.3rem; /* Equivalent to text-3xl */
`;

interface SmartGreetingSubheaderUIBlockProps {
  configuration: SmartGreetingSubheaderUIBlockConfiguration;
}

export function SmartGreetingSubheaderUIBlock({
  configuration: { additionalDetailsFormQuestionId },
}: SmartGreetingSubheaderUIBlockProps) {
  const {
    getHotelId,
    maybeGetBifrostTravelerId,
    maybeGetQuestionWithResponseByFormQuestionId,
  } = useBifrostFormState();

  const hotelId: string = getHotelId();
  const bifrostTravelerId: string = maybeGetBifrostTravelerId() as string;

  const maybeQuestionWithResponse =
    maybeGetQuestionWithResponseByFormQuestionId({
      formQuestionId: additionalDetailsFormQuestionId,
    });

  const maybeQuestionResponse: string =
    (maybeQuestionWithResponse?.response as string) || "";

  const [text, updateText] = useState<string>("");

  useEffect(() => {
    async function setSmartingGreetingText() {
      const response = await getBifrostFormGreeting({
        hotelId,
        bifrostTravelerId,
        additionalDetails: maybeQuestionResponse,
      });

      if ("error" in response.data) {
        console.error(response.data.error.reason);
      }

      const greetingText = response.data.success.greetingText;
      updateText(greetingText);
    }

    setSmartingGreetingText();
  }, [hotelId, bifrostTravelerId, maybeQuestionResponse]);

  return <Wrapper>{text}</Wrapper>;
}
