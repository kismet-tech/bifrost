import { ScreenConfiguration } from ".";

enum ScreenPointerType {
  DIRECT = "DIRECT",
  BRANCH_BY_EVENT_SPACE_REQUIREMENT = "BRANCH_BY_EVENT_SPACE_REQUIREMENT",
  BRANCH_BY_ROOM_AVAILABILITY_ON_DATES = "BRANCH_BY_ROOM_AVAILABILITY_ON_DATES",
}

export interface BaseScreenPointer {
  type: ScreenPointerType;
}

export interface DirectScreenPointer {
  type: ScreenPointerType.DIRECT;
  screenConfiguration: ScreenConfiguration;
}

export interface BranchByEventSpaceRequirementScreenPointer {
  type: ScreenPointerType.BRANCH_BY_EVENT_SPACE_REQUIREMENT;

  eventSpaceIsRequiredScreenConfiguration: ScreenConfiguration;
  eventSpaceIsNotRequiredScreenConfiguration: ScreenConfiguration;
}

export interface BranchByRoomAvailabilityOnDatesScreenPointer {
  type: ScreenPointerType.BRANCH_BY_ROOM_AVAILABILITY_ON_DATES;

  roomsAreAvailableScreenConfiguration: ScreenConfiguration;
  roomsAreNotAvailableButAlternativesAreAvailableScreenConfiguration: ScreenConfiguration;
  roomsAreNotAvailableAndAlternativesAreNotAvailableScreenConfiguration: ScreenConfiguration;
}

export type ScreenPointer = DirectScreenPointer;
