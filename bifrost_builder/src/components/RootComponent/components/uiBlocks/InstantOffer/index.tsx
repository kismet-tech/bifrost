import {
  InstantOfferUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { InstantOfferSummary } from "./models/InstantOfferSummary";
import { RenderableInstantOffer } from "./models/RenderableInstantOffer";
import { RenderedInstantOfferSummary } from "./RenderedInstantOfferSummary";

interface InstantOfferUIBlockProps {
  configuration: InstantOfferUIBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  handleSubmitFormData: () => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  screenConfigurationStack: ScreenConfiguration[];
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
}

export function InstantOfferUIBlock({ hotelId }: InstantOfferUIBlockProps) {
  console.log(hotelId);

  const instantOfferSummary: InstantOfferSummary = {
    instantOfferName: "Vandelay #1",

    startCalendarDate: { year: 2024, month: 12, day: 14 },
    endCalendarDate: { year: 2024, month: 12, day: 17 },
    offerPriceInCents: 98000,
    listPriceInCents: 111000,

    packageImageUrl:
      "https://www.theradiohotel.com/wp-content/uploads/webp/2023/11/RADIO_Standard_Gallery-1_1699382619.webp",
  };

  const renderableInstantOffer: RenderableInstantOffer = {
    startCalendarDate: instantOfferSummary.startCalendarDate,
    endCalendarDate: instantOfferSummary.endCalendarDate,
    offerPriceInCents: instantOfferSummary.offerPriceInCents,
    listPriceInCents: instantOfferSummary.listPriceInCents,
    packageImageUrl: instantOfferSummary.packageImageUrl,

    offerDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    offerCriteria: [
      {
        criterionName: "Space for 20 guests",
        doesMatchCriterion: true,
      },
      {
        criterionName: "Everyone has own bedroom",
        doesMatchCriterion: true,
      },
    ],

    summary: instantOfferSummary,

    hotelRoomOffers: [
      {
        countAvailable: 12,
        countOffered: 12,
        hotelRoomName: "Standard King",
        hotelRoomDescription: "Single occupancy",

        hotelRoomImageUrl:
          "https://fruitbasket.limepack.com/blog/wp-content/uploads/2024/04/pexels-max-vakhtbovycn-6758770.jpg",
      },
      {
        countAvailable: 6,
        countOffered: 4,
        hotelRoomName: "Standard Queen",
        hotelRoomDescription: "Single occupancy",

        hotelRoomImageUrl:
          "https://www.redrockresort.com/wp-content/uploads/2020/12/RR-Standard-2-Queen.jpg",
      },
      {
        countAvailable: 3,
        countOffered: 2,
        hotelRoomName: "Deluxe Queen",
        hotelRoomDescription: "Single occupancy",

        hotelRoomImageUrl:
          "https://www.thelinehotel.com/wp-content/uploads/sites/4/2022/03/14154213/townlake_studio.jpg",
      },
    ],
  };

  return (
    <div>
      <div>Instant Book</div>
      <div className="space-y-4">
        <RenderedInstantOfferSummary
          renderableInstantOffer={renderableInstantOffer}
        />
        <RenderedInstantOfferSummary
          renderableInstantOffer={renderableInstantOffer}
        />
        <RenderedInstantOfferSummary
          renderableInstantOffer={renderableInstantOffer}
        />
      </div>
    </div>
  );
}
