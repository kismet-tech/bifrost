import {
  BaseFormFieldConfiguration,
  FormBlockConfiguration,
  FormBlockType,
} from ".";

export interface BranchingNodeButtonConfiguration {
  label: string;
  keyValue: string;

  submitsForm: boolean;
  branchFormBlocks: FormBlockConfiguration[];
}

export interface BranchingNodeFormBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.BRANCHING_NODE;

  keyName: string;

  buttons: BranchingNodeButtonConfiguration[];
}
