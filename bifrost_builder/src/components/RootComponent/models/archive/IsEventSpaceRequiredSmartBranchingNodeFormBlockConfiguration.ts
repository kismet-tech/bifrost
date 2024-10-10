import {
  BaseFormFieldConfiguration,
  FormBlockConfiguration,
  FormBlockType,
} from ".";

export interface IsEventSpaceRequiredSmartBranchingNodeFormBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.IS_EVENT_SPACE_REQUIRED_SMART_BRANCHING_NODE;

  eventSpaceIsRequiredBranchFormBlocks: FormBlockConfiguration[];
  eventSpaceIsNotRequiredBranchFormBlocks: FormBlockConfiguration[];
}
