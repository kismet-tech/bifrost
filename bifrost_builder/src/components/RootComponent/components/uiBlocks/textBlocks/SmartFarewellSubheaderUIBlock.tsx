import { getBifrostFormFarewellMessage } from "@/api/getBifrostFormFarewellMessage";
import { BifrostFormData } from "@/models/configuration/formData";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  font-size: 1.3rem; /* Equivalent to text-3xl */
`;

interface SmartFarewellSubheaderUIBlockProps {
  hotelId: string;
  formData: BifrostFormData;
  bifrostTravelerId: string;
}

export function SmartFarewellSubheaderUIBlock({
  hotelId,
  formData,
  bifrostTravelerId,
}: SmartFarewellSubheaderUIBlockProps) {
  const [text, updateText] = useState<string>("");

  useEffect(() => {
    async function setSmartingGreetingText() {
      const { farewellText } = await getBifrostFormFarewellMessage({
        hotelId,
        bifrostTravelerId,
        formData,
      });

      updateText(farewellText);
    }

    setSmartingGreetingText();
  }, [hotelId, bifrostTravelerId, formData]);

  return <Wrapper>{text}</Wrapper>;
}
