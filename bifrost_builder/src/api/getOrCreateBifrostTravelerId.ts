import { sentryScope } from "@/instrument";
import { Api } from ".";

export const getOrCreateBifrostTravelerId = async (): Promise<{
  bifrostTravelerId: string;
}> => {
  try {
    const response = await Api.post<{
      success: { bifrostTravelerId: string };
    }>(`/Bifrost/GetOrCreateBifrostTravelerId`, {}, {});

    const bifrostTravelerId: string = response.data.success.bifrostTravelerId;

    return { bifrostTravelerId };
  } catch (error) {
    console.error(`Error acquiring bifrostTravelerId: ${error}`);

    if (error instanceof Error) {
      const updatedError = new Error(
        `getOrCreateBifrostTravelerId_ERROR: ${error.message}`
      );
      updatedError.name = `getOrCreateBifrostTravelerId_ERROR_${error.name}`;
      sentryScope.setExtra("version", __APP_VERSION__);
      sentryScope.captureException(updatedError);
    } else {
      sentryScope.setExtra("version", __APP_VERSION__);
      sentryScope.captureException(error);
    }
    return { bifrostTravelerId: "" };
  }
};
