import { FormFieldConfiguration, FormFieldType } from "./models";

export function getFormFieldConfigurations(): FormFieldConfiguration[] {
  //   const currentUrl = window.location.href;
  //   console.log(`currentUrl: ${currentUrl}`); // e.g., 'http://example.com/page?name=value'

  //   const pathname = window.location.pathname;
  //   console.log(`pathname: ${pathname}`); // e.g., 'http://example.com/page?name=value'

  //   const hostname = window.location.hostname;
  //   console.log(`hostname: ${hostname}`);

  const urlPathname = window.location.pathname;

  if (urlPathname.includes("/group-bookings")) {
    return [
      {
        formFieldType: FormFieldType.TEXT,
        label: "Full Name",
        name: "full_name",
        placeholder: "Your full name",
        inputType: "text",
      },
      {
        formFieldType: FormFieldType.TEXT,
        label: "Email",
        name: "email",
        placeholder: "Your email address",
        inputType: "email",
      },
      {
        formFieldType: FormFieldType.TEXT,
        label: "Phone Number",
        name: "phone_number",
        placeholder: "Your phone number",
        inputType: "tel",
      },
      {
        formFieldType: FormFieldType.TEXT,
        label: "Company",
        name: "company",
        placeholder: "Your company name",
        inputType: "text",
      },
      {
        formFieldType: FormFieldType.SELECT,
        label: "Location",
        name: "location",
        options: [
          { label: "Lincoln Park", name: "lincoln_park" },
          { label: "Grand Beach, MI", name: "grand_beach" },
          { label: "New Buffalo, MI", name: "new_buffalo" },
          { label: "Little Italy", name: "little_italy" },
        ],
      },
      {
        formFieldType: FormFieldType.TEXT_AREA,
        label: "Additional Details",
        name: "additional_details",
        placeholder: "Any additional details...",
      },
    ];
  } else if (urlPathname.includes("/extended-stays")) {
    return [
      {
        formFieldType: FormFieldType.TEXT,
        label: "Full Name",
        name: "full_name",
        placeholder: "Your full name",
        inputType: "text",
      },
      {
        formFieldType: FormFieldType.TEXT,
        label: "Email",
        name: "email",
        placeholder: "Your email address",
        inputType: "email",
      },
      {
        formFieldType: FormFieldType.SELECT,
        label: "Location",
        name: "location",
        options: [
          { label: "Lincoln Park", name: "lincoln_park" },
          { label: "Grand Beach, MI", name: "grand_beach" },
          { label: "New Buffalo, MI", name: "new_buffalo" },
          { label: "Little Italy", name: "little_italy" },
        ],
      },
      {
        formFieldType: FormFieldType.SELECT,
        label: "Bed Type",
        name: "bed_type",
        options: [
          { label: "Studio", name: "studio" },
          { label: "One", name: "one" },
          { label: "Two", name: "two" },
          { label: "Three", name: "three" },
        ],
      },
      {
        formFieldType: FormFieldType.TEXT,
        label: "Check-In Date & Check-Out Date",
        name: "check_in_and_check_out_date",
        placeholder: "Your check-in and check-out dates",
        inputType: "text",
      },
      {
        formFieldType: FormFieldType.TEXT,
        label: "Budget",
        name: "budget",
        placeholder: "Your budget",
        inputType: "text",
      },
      {
        formFieldType: FormFieldType.TEXT_AREA,
        label: "Additional Details",
        name: "additional_details",
        placeholder: "Any additional details...",
      },
    ];
  }

  return [];
}
