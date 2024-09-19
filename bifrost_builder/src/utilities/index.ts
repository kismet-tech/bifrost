import { recordWebsiteVisitFromAdLinkUrl } from "@/config";
import axios from "axios";

export const getBifrostTravelerId = (): string | undefined => {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("bifrostTravelerId="))
        ?.split("=")[1];
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

                const domain = window.location.hostname;
                const secure = window.location.protocol === "https:" ? "; secure" : "";
                const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

                document.cookie = `bifrostTravelerId=${receivedBifrostTravelerId}; path=/; domain=${domain}${secure}; SameSite=Strict; expires=${expirationDate}`;
            }
        } catch (error) {
            console.error("Error recording website visit:", error);
        }
    }
};
