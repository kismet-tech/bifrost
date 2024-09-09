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
        name: "fullName",
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
        name: "phoneNumber",
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
        name: "additionalDetails",
        placeholder: "Any additional details...",
      },
    ];
  } else if (urlPathname.includes("/extended-stays")) {
    return [
      {
        formFieldType: FormFieldType.TEXT,
        label: "Full Name",
        name: "fullName",
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
        name: "bedType",
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
        name: "dates",
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
        name: "additionalDetails",
        placeholder: "Any additional details...",
      },
    ];
  }

  return [];
}
