import { determineIfRoomsAreAvailableForBifrostTravelerOnDates } from "@/api/determineIfRoomsAreAvailableForBifrostTravelerOnDates";
import { FormBlockConfiguration } from "@/components/KismetForm/models";
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
      const {
        roomsAreAvailable,
        alternativeStartCalendarDate,
        alternativeEndCalendarDate,
      } = await determineIfRoomsAreAvailableForBifrostTravelerOnDates({
        hotelId,
        formData: formState,
      });

      if (roomsAreAvailable) {
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

          pushFormFieldConfigurationStack(
            roomsAreNotAvailableBranchButAlternativesAreAvailableFormBlocks
          );
        } else {
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
