import { recordWebsiteVisitFromAdLinkUrl } from "@/config";
import axios from "axios";
import Cookies from 'js-cookie';
import { sentryScope } from "@/instrument";

export const getBifrostTravelerId = (): string | undefined => {
    return Cookies.get('bifrostTravelerId');
};

export const setBifrostTravelerId = (bifrostTravelerId: string): void => {
    const domain = window.location.hostname;
    const secure = window.location.protocol === "https:";
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    Cookies.set('bifrostTravelerId', bifrostTravelerId, {
        expires: expirationDate,
        path: '/',
        domain: domain,
        secure: secure,
        sameSite: 'strict'
    });
};

export const handleBifrostTraveler = async (url: URL) => {
    const maybeTemporaryBifrostTravelerId: string | undefined = url.searchParams.get("temporaryBifrostTravelerId") || undefined;

    if (maybeTemporaryBifrostTravelerId) {
        const bifrostTravelerId = getBifrostTravelerId();
        console.log("bifrostTravelerId", bifrostTravelerId);

        try {
            const response = await axios.post(recordWebsiteVisitFromAdLinkUrl, {
                temporaryBifrostTravelerId: maybeTemporaryBifrostTravelerId,
                bifrostTravelerId: bifrostTravelerId
            });

            console.log("response", response);

            const receivedBifrostTravelerId = response.data.success.bifrostTravelerId;
            console.log("Received visitorId:", receivedBifrostTravelerId);

            if (receivedBifrostTravelerId) {
                setBifrostTravelerId(receivedBifrostTravelerId);
            }
        } catch (error: unknown) {
            console.error("Error recording website visit:", error);

            if (error instanceof Error) {
                const updatedError = new Error(`BIFROST_RECORD_WEBSITE_VISIT_ERROR: ${error.message}`);
                updatedError.name = `BIFROST_RECORD_WEBSITE_VISIT_ERROR_${error.name}`;
                sentryScope.setExtra("temporaryBifrostTravelerId", maybeTemporaryBifrostTravelerId);
                sentryScope.setExtra("bifrostTravelerId", bifrostTravelerId);
                sentryScope.setExtra("version", __APP_VERSION__);
                sentryScope.captureException(updatedError);
            } else {
                sentryScope.setExtra("temporaryBifrostTravelerId", maybeTemporaryBifrostTravelerId);
                sentryScope.setExtra("bifrostTravelerId", bifrostTravelerId);
                sentryScope.setExtra("version", __APP_VERSION__);
                sentryScope.captureException(error);
            }
        }
    }
};
