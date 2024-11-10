import { getBifrostFormFarewellMessage } from "@/api/getBifrostFormFarewellMessage";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  font-size: 1.3rem; /* Equivalent to text-3xl */
`;

interface SmartFarewellSubheaderUIBlockProps {}

export function SmartFarewellSubheaderUIBlock({}: SmartFarewellSubheaderUIBlockProps) {
  const { maybeGetBifrostTravelerId, getHotelId, getQuestionsWithResponses } =
    useBifrostFormState();

  const [text, updateText] = useState<string>("");

  const bifrostTravelerId: string = maybeGetBifrostTravelerId() as string;
  const hotelId: string = getHotelId();

  const questionsWithResponses: QuestionWithResponse[] =
    getQuestionsWithResponses();

  useEffect(() => {
    async function setSmartingGreetingText() {
      const { farewellText } = await getBifrostFormFarewellMessage({
        hotelId,
        bifrostTravelerId,
        questionsWithResponses,
      });

      updateText(farewellText);
    }

    setSmartingGreetingText();
  }, [hotelId, bifrostTravelerId, questionsWithResponses]);

  return <Wrapper>{text}</Wrapper>;
}
