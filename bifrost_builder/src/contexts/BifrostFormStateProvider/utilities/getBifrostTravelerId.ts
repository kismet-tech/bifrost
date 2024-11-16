import { getOrCreateBifrostTravelerId } from "@/api/getOrCreateBifrostTravelerId";

const LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY = "bifrostTravelerId";

export const getBifrostTravelerId = async (): Promise<{
  bifrostTravelerId: string;
}> => {
  const maybeExistingBifrostTravelerId: string | null = localStorage.getItem(
    LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY
  );

  console.log(
    `maybeExistingBifrostTravelerId: ${maybeExistingBifrostTravelerId}`
  );

  if (
    maybeExistingBifrostTravelerId &&
    !["", "undefined"].includes(maybeExistingBifrostTravelerId)
  ) {
    localStorage.removeItem(LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY);
    localStorage.setItem(
      LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY,
      maybeExistingBifrostTravelerId
    );

    return { bifrostTravelerId: maybeExistingBifrostTravelerId };
  }

  // Acquire a Bifrost Traveler ID

  const { bifrostTravelerId } = await getOrCreateBifrostTravelerId();
  localStorage.setItem(
    LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY,
    bifrostTravelerId
  );

  return { bifrostTravelerId };
};
