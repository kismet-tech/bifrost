import { determineIfBifrostTravelerRequiresAnEventSpace } from "@/api/determineIfBifrostTravelerRequiresAnEventSpace";
import { FormBlockConfiguration } from "@/components/KismetForm/models";
import { IsEventSpaceRequiredSmartBranchingNodeFormBlockConfiguration } from "@/components/KismetForm/models/IsEventSpaceRequiredSmartBranchingNodeFormBlockConfiguration";
import { useEffect } from "react";

interface IsEventSpaceRequiredSmartBranchingNodeProps {
  branchingNodeFormBlockConfiguration: IsEventSpaceRequiredSmartBranchingNodeFormBlockConfiguration;
  pushFormFieldConfigurationStack: (
    formBlockConfigurations: FormBlockConfiguration[]
  ) => void;
  hotelId: string;
  formState: Record<string, string>;
}

export function IsEventSpaceRequiredSmartBranchingNode({
  branchingNodeFormBlockConfiguration,
  pushFormFieldConfigurationStack,
  hotelId,
  formState,
}: IsEventSpaceRequiredSmartBranchingNodeProps) {
  useEffect(() => {
    async function branchAccordingToEventSpaceRequirement() {
      const { isEventSpaceRequired } =
        await determineIfBifrostTravelerRequiresAnEventSpace({
          hotelId,
          formData: formState,
        });

      if (isEventSpaceRequired) {
        pushFormFieldConfigurationStack(
          branchingNodeFormBlockConfiguration.eventSpaceIsRequiredBranchFormBlocks
        );
      } else {
        pushFormFieldConfigurationStack(
          branchingNodeFormBlockConfiguration.eventSpaceIsNotRequiredBranchFormBlocks
        );
      }
    }

    branchAccordingToEventSpaceRequirement();
  });

  return <></>;
}
