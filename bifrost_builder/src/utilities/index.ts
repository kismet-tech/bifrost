import { recordWebsiteVisitFromAdLinkUrl } from "@/config";
import axios from "axios";
import Cookies from 'js-cookie';

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
        } catch (error) {
            console.error("Error recording website visit:", error);
        }
    }
};
