import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";

interface RenderedInstantOfferRoomCarouselProps {
  renderableInstantOffer: RenderableBifrostInstantBookOffer;
}

export function RenderedInstantOfferRoomCarousel({
  renderableInstantOffer,
}: RenderedInstantOfferRoomCarouselProps) {
  const { hotelRoomOffers } = renderableInstantOffer;

  return (
    <div className="w-full relative">
      {/* Custom Navigation Buttons */}
      <button
        aria-label="Previous Slide"
        className="swiper-button-prev-custom absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        aria-label="Next Slide"
        className="swiper-button-next-custom absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        grabCursor={true}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        loop={false}
        modules={[Navigation]}
        className="mt-4 w-full"
      >
        {hotelRoomOffers.map((roomOffer, index) => (
          <SwiperSlide key={index} className="!w-64 sm:!w-72 md:!w-80">
            <div className="relative">
              {/* Badge */}
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {roomOffer.countOffered}
              </div>

              {/* Room Image */}
              <img
                src={roomOffer.hotelRoomImageUrls[0]}
                alt={roomOffer.hotelRoomName}
                className="w-full h-40 object-cover rounded"
              />

              {/* Room Name and Description */}
              <div className="mt-2">
                <h3 className="text-lg font-semibold">
                  {roomOffer.hotelRoomName}
                </h3>
                <p className="text-sm text-gray-600">
                  {roomOffer.hotelRoomDescription}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
