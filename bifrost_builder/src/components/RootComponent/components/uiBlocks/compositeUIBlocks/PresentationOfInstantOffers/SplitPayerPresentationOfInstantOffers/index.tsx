import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { SplitPayerRenderedInstantOfferSummary } from "./SplitPayerRenderedInstantOfferSummary";
import { useState } from "react";
import { SplitPayerRenderedInstantOffersFooter } from "./SplitPayerRenderedInstantOffersFooter";
import { RenderedSplitPayerRenderedInstantOfferRules } from "./RenderedSplitPayerRenderedInstantOfferRules";
import { getBifrostSinglePayerCheckoutUrl } from "@/api/getBifrostSinglePayerCheckoutUrl";
import { GetBifrostSplitPayerCheckoutUrlHotelRoomInstantBookOffer } from "@/api/getBifrostSplitPayerCheckoutUrl/models";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";

interface SplitPayerPresentationOfInstantOffersProps {
  renderableInstantOffers: RenderableBifrostInstantBookOffer[];
}

export function SplitPayerPresentationOfInstantOffers({
  renderableInstantOffers,
}: SplitPayerPresentationOfInstantOffersProps) {
  const {
    getHotelId,
    maybeGetBifrostTravelerId,
    maybeGetBifrostFormId,
    maybeGetLocalFormUserSessionId,
    getUserSessionId,
  } = useBifrostFormState();

  const [
    selectedBifrostInstantBookOfferId,
    setSelectedBifrostInstantBookOfferId,
  ] = useState<string | undefined>(undefined);

  const [bifrostSinglePayerCheckoutUrl, setBifrostSinglePayerCheckoutUrl] =
    useState<string | undefined>(undefined);

  const hotelId: string = getHotelId();
  const bifrostTravelerId: string = maybeGetBifrostTravelerId() as string;
  const bifrostFormId: string = maybeGetBifrostFormId() as string;
  const localFormUserSessionId: string =
    maybeGetLocalFormUserSessionId() as string;
  const userSessionId: string = getUserSessionId() as string;

  const selectInstantOffer = (instantOfferId: string) => {
    setSelectedBifrostInstantBookOfferId(
      (previousSelectedBifrostInstantBookOfferId) => {
        if (previousSelectedBifrostInstantBookOfferId === instantOfferId) {
          return undefined;
        }
        return instantOfferId;
      }
    );
  };

  const countOfRoomsOffered = renderableInstantOffers.reduce(
    (accum: number, renderableInstantOffer) => {
      return (
        accum +
        renderableInstantOffer.hotelRoomOffers.reduce(
          (accum: number, hotelRoomOffer) => {
            return accum + hotelRoomOffer.countOffered;
          },
          0
        )
      );
    },
    0
  );

  const handleRequestBookingLink = async (): Promise<string> => {
    if (!bifrostSinglePayerCheckoutUrl) {
      const renderableInstantOffer: RenderableBifrostInstantBookOffer =
        renderableInstantOffers.find((renderableInstantOffer) => {
          return (
            renderableInstantOffer.bifrostInstantBookOfferId ===
            selectedBifrostInstantBookOfferId
          );
        }) as RenderableBifrostInstantBookOffer;

      const hotelRoomOffers: GetBifrostSplitPayerCheckoutUrlHotelRoomInstantBookOffer[] =
        renderableInstantOffer.hotelRoomOffers.map(
          (
            hotelRoomOffer
          ): GetBifrostSplitPayerCheckoutUrlHotelRoomInstantBookOffer => {
            return {
              countRequested: hotelRoomOffer.countOffered,
              offerPriceInCents: hotelRoomOffer.offerPriceInCents,
              hotelRoomId: hotelRoomOffer.hotelRoomId,
            };
          }
        );

      const { checkoutUrl } = await getBifrostSinglePayerCheckoutUrl({
        hotelId,
        bifrostTravelerId,
        bifrostFormId,
        localFormUserSessionId,

        startCalendarDate: renderableInstantOffer.startCalendarDate,
        endCalendarDate: renderableInstantOffer.endCalendarDate,

        hotelRoomOffers,
        userSessionId,
      });

      setBifrostSinglePayerCheckoutUrl(checkoutUrl);

      return checkoutUrl || "";
    }

    return bifrostSinglePayerCheckoutUrl;
  };

  return (
    <div>
      <div>
        <div>
          Thanks for your interest in Knollcroft. Someone will be in touch soon.
          We’re able to offer a group discount to your party on the following
          terms:
        </div>
        <RenderedSplitPayerRenderedInstantOfferRules
          countOfRoomsOffered={countOfRoomsOffered}
          renderableInstantOffers={renderableInstantOffers}
        />
      </div>

      <div className="mt-4 text-lg font-bold pb-4">Instant Book</div>
      <div className="space-y-4">
        {renderableInstantOffers.map((renderableInstantOffer, index) => {
          return (
            <SplitPayerRenderedInstantOfferSummary
              key={index}
              instantOfferIndex={index}
              renderableInstantOffer={renderableInstantOffer}
              hotelId={hotelId}
              bifrostTravelerId={bifrostTravelerId}
              bifrostFormId={bifrostFormId}
              localFormUserSessionId={localFormUserSessionId}
              userSessionId={userSessionId}
              handleClickSelectInstantOffer={() =>
                selectInstantOffer(
                  renderableInstantOffer.bifrostInstantBookOfferId
                )
              }
              selectedBifrostInstantBookOfferId={
                selectedBifrostInstantBookOfferId
              }
            />
          );
        })}
      </div>

      {selectedBifrostInstantBookOfferId && (
        <div className="pt-5">
          <SplitPayerRenderedInstantOffersFooter
            handleRequestBookingLink={handleRequestBookingLink}
          />
        </div>
      )}
    </div>
  );
}
