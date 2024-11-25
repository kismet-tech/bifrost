import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import ChatIcon from "./ChatIcon.svg";
import AttachmentIconOverBoxes from "./AttachmentIconOverBoxes.svg";
import WhatsAppIcon from "./WhatsAppIcon.svg";
import EmailIcon from "./EmailIcon.svg";

interface SplitPayerRenderedInstantOffersFooterProps {
  handleRequestBookingLink: () => Promise<string>;
}

export function SplitPayerRenderedInstantOffersFooter({
  handleRequestBookingLink,
}: SplitPayerRenderedInstantOffersFooterProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 flex justify-center mb-4">
        <Button
          onClick={async () => {
            const bookingLink: string = await handleRequestBookingLink();
            window.location.href = bookingLink;
          }}
          className="bg-black text-white px-10 py-3 w-auto rounded-lg"
        >
          Book your room
          <ArrowRight className="ml-2" />
        </Button>
      </div>

      <div className="text-center mb-2">Booking link to share:</div>

      <div className="flex space-x-4">
        <img
          src={EmailIcon}
          alt="Email Booking URL"
          className="border border-black rounded-lg p-2 cursor-pointer"
          onClick={async () => {
            const bookingLink: string = await handleRequestBookingLink();
            window.location.href = `mailto:?subject=Book your room&body=Here is the booking link: ${bookingLink}`;
          }}
        />
        <img
          src={WhatsAppIcon}
          alt="Send WhatsApp Booking URL"
          className="border border-black rounded-lg p-2 cursor-pointer"
          onClick={async () => {
            const bookingLink: string = await handleRequestBookingLink();
            const whatsappMessage = `Here is the booking link: ${bookingLink}`;
            window.location.href = `https://wa.me/?text=${encodeURIComponent(
              whatsappMessage
            )}`;
          }}
        />
        <img
          src={ChatIcon}
          alt="Text Booking URL"
          className="border border-black rounded-lg p-2 cursor-pointer"
          onClick={async () => {
            const bookingLink: string = await handleRequestBookingLink();
            const smsBody = `Here is the booking link: ${bookingLink}`;
            window.location.href = `sms:?&body=${encodeURIComponent(smsBody)}`;
          }}
        />
        <img
          src={AttachmentIconOverBoxes}
          alt="Copy Booking URL"
          className="border border-black rounded-lg p-2 cursor-pointer"
          onClick={async () => {
            const bookingLink: string = await handleRequestBookingLink();
            await navigator.clipboard.writeText(bookingLink);
          }}
        />
      </div>
    </div>
  );
}
