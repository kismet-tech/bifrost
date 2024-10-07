import { determineIfRoomsAreAvailableForBifrostTravelerOnDates } from "@/api/determineIfRoomsAreAvailableForBifrostTravelerOnDates";
import { FormBlockConfiguration } from "@/components/RootComponent/models";
import { AreRoomsAvailableOnDatesSmartBranchingNodeFormBlockConfiguration } from "@/components/KismetForm/models/AreRoomsAvailableOnDatesBranchingNodeFormBlockConfiguration";
import { useEffect } from "react";

interface AreRoomsAvailableOnDatesSmartBranchingNodeProps {
  configuration: AreRoomsAvailableOnDatesSmartBranchingNodeFormBlockConfiguration;
  pushFormFieldConfigurationStack: (
    formBlockConfigurations: FormBlockConfiguration[]
  ) => void;
  hotelId: string;
  formState: Record<string, string>;
  handleUpdateFormState: ({
    keyName,
    keyValue,
  }: {
    keyName: string;
    keyValue: string;
  }) => void;
}

export function AreRoomsAvailableOnDatesSmartBranchingNode({
  configuration: {
    startCalendarDateKeyName,
    endCalendarDateKeyName,
    alternativeStartCalendarDateKeyName,
    alternativeEndCalendarDateKeyName,
    rommsAreAvailableBranchFormBlocks,
    roomsAreNotAvailableBranchButAlternativesAreAvailableFormBlocks,
    roomsAreNotAvailableBranchAndNoAlternativesAreAvailableFormBlocks,
  },
  pushFormFieldConfigurationStack,
  hotelId,
  formState,
  handleUpdateFormState,
}: AreRoomsAvailableOnDatesSmartBranchingNodeProps) {
  useEffect(() => {
    async function branchAccordingToEventSpaceRequirement() {
      const startCalendarDate =
        startCalendarDateKeyName && formState[startCalendarDateKeyName]
          ? JSON.parse(formState[startCalendarDateKeyName])
          : undefined;
      const endCalendarDate =
        endCalendarDateKeyName && formState[endCalendarDateKeyName]
          ? JSON.parse(formState[endCalendarDateKeyName])
          : undefined;

      if (!endCalendarDate || !startCalendarDate) {
        console.log(
          "Missing endCalendarDate or startCalendarDate | Pushing roomsAreAvailableBranchFormBlocks"
        );
        pushFormFieldConfigurationStack(rommsAreAvailableBranchFormBlocks);
      }

      const {
        roomsAreAvailable,
        alternativeStartCalendarDate,
        alternativeEndCalendarDate,
      } = await determineIfRoomsAreAvailableForBifrostTravelerOnDates({
        hotelId,
        startCalendarDate: JSON.parse(formState[startCalendarDateKeyName]),
        endCalendarDate: JSON.parse(formState[endCalendarDateKeyName]),
        formData: formState,
      });

      if (roomsAreAvailable) {
        console.log("Pushing roomsAreAvailableBranchFormBlocks");
        pushFormFieldConfigurationStack(rommsAreAvailableBranchFormBlocks);
      } else {
        if (alternativeStartCalendarDate && alternativeEndCalendarDate) {
          handleUpdateFormState({
            keyName: alternativeStartCalendarDateKeyName,
            keyValue: JSON.stringify(alternativeStartCalendarDate),
          });

          handleUpdateFormState({
            keyName: alternativeEndCalendarDateKeyName,
            keyValue: JSON.stringify(alternativeEndCalendarDate),
          });

          console.log(
            "Pushing roomsAreNotAvailableBranchButAlternativesAreAvailableFormBlocks"
          );
          pushFormFieldConfigurationStack(
            roomsAreNotAvailableBranchButAlternativesAreAvailableFormBlocks
          );
        } else {
          console.log(
            "Pushing roomsAreNotAvailableBranchAndNoAlternativesAreAvailableFormBlocks"
          );
          pushFormFieldConfigurationStack(
            roomsAreNotAvailableBranchAndNoAlternativesAreAvailableFormBlocks
          );
        }
      }
    }

    branchAccordingToEventSpaceRequirement();
  });

  return <></>;
}
