import { submitBifrostForm } from "@/api/submitBifrostForm";
import { sentryScope } from "@/instrument";
import { BifrostConfiguration } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";

interface HandleSubmitFormDataProps {
  bifrostTravelerId: string;
  localFormUserSessionId: string;
  bifrostConfiguration: BifrostConfiguration;
  formData: BifrostFormData;
}

export const handleSubmitFormData = async ({
  bifrostTravelerId,
  localFormUserSessionId,
  bifrostConfiguration,
  formData,
}: HandleSubmitFormDataProps) => {
  try {
    const response = await submitBifrostForm({
      hotelId: bifrostConfiguration.hotelId,
      bifrostTravelerId,
      bifrostFormId: bifrostConfiguration.bifrostFormId,
      localFormUserSessionId,
      formData,
    });

    if (response.data && response.data.error) {
      const serverError = new Error(
        `BIFROST_SERVER_ERROR: ${response.data.error}`
      );
      serverError.name = "BIFROST_SERVER_ERROR";
      sentryScope.setExtra("hotelId", bifrostConfiguration.hotelId);
      sentryScope.setExtra("bifrostTravelerId", bifrostTravelerId);
      sentryScope.setExtra("bifrostFormId", bifrostConfiguration.bifrostFormId);
      sentryScope.setExtra("formData", formData);
      sentryScope.setExtra("version", __APP_VERSION__);
      sentryScope.setExtra("serverResponse", response.data);
      sentryScope.captureException(serverError);
      console.error("Error submitting form:", serverError);
    }
    console.log("COMPLETED");
  } catch (error) {
    const updatedError = new Error(
      `BIFROST_FORM_SUBMISSION_ERROR: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    updatedError.name = "BIFROST_FORM_SUBMISSION_ERROR";
    sentryScope.setExtra("hotelId", bifrostConfiguration.hotelId);
    sentryScope.setExtra("bifrostTravelerId", bifrostTravelerId);
    sentryScope.setExtra("bifrostFormId", bifrostConfiguration.bifrostFormId);
    sentryScope.setExtra("formData", formData);
    sentryScope.setExtra("version", __APP_VERSION__);
    sentryScope.captureException(updatedError);
    console.error("Error submitting form:", error);
  }
};
