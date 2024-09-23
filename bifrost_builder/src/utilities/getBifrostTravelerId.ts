import { getOrCreateBifrostTravelerId } from "@/api/getOrCreateBifrostTravelerId";
import { sentryScope } from "@/instrument";

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

  try {
    const { bifrostTravelerId } = await getOrCreateBifrostTravelerId();
    console.log(`bifrostTravelerId: ${bifrostTravelerId}`);

    localStorage.setItem(
      LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY,
      bifrostTravelerId
    );

    return { bifrostTravelerId };
  } catch (error) {
    console.error(`Error acquiring bifrostTravelerId: ${error}`);
    if (error instanceof Error) {
      const updatedError = new Error(
        `BIFROST_RECORD_WEBSITE_VISIT_ERROR: ${error.message}`
      );
      updatedError.name = `BIFROST_RECORD_WEBSITE_VISIT_ERROR_${error.name}`;
      sentryScope.setExtra("version", __APP_VERSION__);
      sentryScope.captureException(updatedError);
    } else {
      sentryScope.setExtra("version", __APP_VERSION__);
      sentryScope.captureException(error);
    }
  }

  return { bifrostTravelerId: "" };
};
