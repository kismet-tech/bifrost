import { updateBifrostUserSession } from "@/api/updateBifrostUserSession";
import { routeWithPointer } from "@/components/RootComponent/utilities/routeWithPointer";
import { Button } from "@/components/ui/button";
import { useBifrostSessionData } from "@/contexts/useBifrostSessionData";
import {
  ButtonUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import { mutateFormDataAtKeyPath } from "@/utilities/formData/mutateFormDataAtKeyPath";
import { writeValueToBifrostFormDataByKeyPath } from "@/utilities/formData/writeValueToBifrostFormDataByKeyPath";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

interface ButtonUIBlockProps {
  configuration: ButtonUIBlockConfiguration;
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  handleSubmitFormData: () => Promise<void>;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function ButtonUIBlock({
  configuration: {
    keyName,
    keyValue,
    label,
    submitsForm,
    updatesUserSession,
    updatesUserSessionKeyPaths,
    screenPointer: pointer,
  },
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  keyPath,
  formData,
  setFormData,
  handleSubmitFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
}: ButtonUIBlockProps) {
  const { mutateBifrostSessionData } = useBifrostSessionData();

  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (keyName && keyValue) {
      mutateFormDataAtKeyPath({
        mutations: [
          {
            keyPath: [...keyPath, keyName],
            keyValue,
          },
        ],
        setFormData,
      });
    }

    if (submitsForm) {
      await handleSubmitFormData();
    }

    if (
      updatesUserSession &&
      updatesUserSessionKeyPaths &&
      updatesUserSessionKeyPaths.length > 0
    ) {
      const userSessionId = getValueFromBifrostFormDataByKeyPath({
        keyPath: ["userSessionId"],
        formData,
      });

      const updatedFormData = updatesUserSessionKeyPaths.reduce(
        (accum, keyPath) => {
          const keyValue = getValueFromBifrostFormDataByKeyPath({
            keyPath,
            formData,
          });

          const updatedAccum = writeValueToBifrostFormDataByKeyPath({
            formData: accum,
            keyPath,
            updatedKeyValue: keyValue,
          });

          return updatedAccum;
        },
        {}
      );

      updateBifrostUserSession({
        hotelId,
        bifrostTravelerId,
        bifrostFormId,
        localFormUserSessionId,
        updatedFormData,
        userSessionId,
      });
    }

    if (pointer) {
      routeWithPointer({
        pointer,
        hotelId,
        bifrostTravelerId,
        bifrostFormId,
        localFormUserSessionId,
        formData,
        setFormData,
        handleSubmitFormData,
        pushScreenConfigurationStack,
        popRightscreenConfigurationStack,
        mutateBifrostSessionData,
      });
    }

    registerBifrostFormInput();
  };

  return (
    <Wrapper>
      <Button onClick={handleButtonClick}>{label}</Button>
    </Wrapper>
  );
}
