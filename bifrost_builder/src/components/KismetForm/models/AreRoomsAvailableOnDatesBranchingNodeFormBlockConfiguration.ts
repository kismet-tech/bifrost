import {
  BaseFormFieldConfiguration,
  FormBlockConfiguration,
  FormBlockType,
} from ".";

export interface AreRoomsAvailableOnDatesSmartBranchingNodeFormBlockConfiguration
  extends BaseFormFieldConfiguration {
  formBlockType: FormBlockType.ARE_ROOMS_AVAILABLE_ON_DATES_SMART_BRANCHING_NODE;

  startCalendarDateKeyName: string;
  endCalendarDateKeyName: string;

  alternativeStartCalendarDateKeyName: string;
  alternativeEndCalendarDateKeyName: string;

  rommsAreAvailableBranchFormBlocks: FormBlockConfiguration[];

  roomsAreNotAvailableBranchButAlternativesAreAvailableFormBlocks: FormBlockConfiguration[];
  roomsAreNotAvailableBranchAndNoAlternativesAreAvailableFormBlocks: FormBlockConfiguration[];
}
