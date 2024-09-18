import { recordWebsiteVisitFromAdLinkUrl } from "@/config";
import axios from "axios";

export const getVisitorId = (): string | undefined => {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("visitorId="))
        ?.split("=")[1];
};

export const handleBifrostTraveler = async (url: URL) => {
    const maybeBifrostTravelerId: string | undefined = url.searchParams.get("bifrostTravelerId") || undefined;

    if (maybeBifrostTravelerId) {
        const visitorId = getVisitorId();
        console.log("visitorId", visitorId);

        try {
            const response = await axios.post(recordWebsiteVisitFromAdLinkUrl, {
                bifrostTravelerId: maybeBifrostTravelerId,
                visitorId: visitorId
            });

            console.log("response", response);

            const receivedVisitorId = response.data.success.visitorId;
            console.log("Received visitorId:", receivedVisitorId);

            if (receivedVisitorId) {

                const domain = window.location.hostname;
                const secure = window.location.protocol === "https:" ? "; secure" : "";
                const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

                document.cookie = `visitorId=${receivedVisitorId}; path=/; domain=${domain}${secure}; SameSite=Strict; expires=${expirationDate}`;
            }
        } catch (error) {
            console.error("Error recording website visit:", error);
        }
    }
};
