import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/RootComponent/models";
import { knollcroftBusinessBudgetRangeFormBlocks } from "./knollcroftBusinessBudgetRangeFormBlocks";

export const knollcroftBusinessFormBlocks: FormBlockConfiguration[] = [
  {
    formBlockType: FormBlockType.SMART_GREETING_SUBHEADER,
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Company",
    keyName: "company",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.SELECT_INPUT,
    label: "Contact me by",
    keyName: "preferred_contact_method",
    options: [
      { label: "Email", keyValue: "email" },
      { label: "Phone", keyValue: "phone" },
      { label: "Text", keyValue: "text" },
    ],
  },
  // {
  //   formBlockType: FormBlockType.TEXT_INPUT,
  //   label: "Number of People",
  //   keyName: "number_of_people_total",
  //   placeholder: "",
  //   inputType: "text",
  // },
  {
    formBlockType: FormBlockType.RANGE_SLIDER,
    label: "Number of People",
    valueMinKeyName: "number_of_people_total_min",
    valueMaxKeyName: "number_of_people_total_max",
    rangeMin: 1,
    rangeMax: 30,
  },
  //   {
  //     formBlockType: FormBlockType.EXPANDABLE_SELECTION_CARDS,
  //     label: "Room Type",
  //     keyName: "room_type",
  //     options: [
  //       {
  //         imageSrc:
  //           "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=3473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         name: "King Bed Suite",
  //         description: `
  // Lorem ipsum odor amet, consectetuer adipiscing elit. Bibendum hendrerit consequat nascetur cras magnis primis cubilia conubia. Ipsum augue aliquam scelerisque duis consectetur nulla blandit morbi sociosqu. Ante placerat quisque neque primis vivamus; imperdiet leo dapibus class. Dis dignissim placerat magnis tincidunt pharetra nulla consequat neque. Nostra adipiscing fermentum placerat aenean ad suscipit quam metus.

  // Pulvinar ut cras aliquam morbi montes interdum, nec montes hac. Vulputate est tortor nascetur magna arcu ante mus at leo. Nascetur molestie orci nec enim ipsum quis orci erat. Sapien aliquet vel congue nullam ultrices. Arcu turpis aptent lectus et faucibus metus ut. Purus libero pharetra et tempus viverra; augue magnis fringilla. Amet bibendum massa fringilla placerat habitant. Leo mus consequat quam efficitur primis.

  // Nibh tempus curabitur purus enim mus faucibus? Sagittis vitae consectetur vitae imperdiet scelerisque. Facilisi leo montes porttitor nostra leo lobortis euismod finibus. Congue arcu vehicula porttitor inceptos fermentum auctor. Volutpat nascetur lectus accumsan facilisis, habitasse a. Curabitur ligula curae lorem venenatis nisl.
  //     `.trim(),
  //       },
  //       {
  //         imageSrc:
  //           "https://www.elliotparkhotel.com/wp-content/uploads/2018/05/double-queen-eph-01-1440x973.jpg",
  //         name: "Deluxe 2 Queen Bed Room",
  //         description: `
  // Lorem ipsum odor amet, consectetuer adipiscing elit. Bibendum hendrerit consequat nascetur cras magnis primis cubilia conubia. Ipsum augue aliquam scelerisque duis consectetur nulla blandit morbi sociosqu. Ante placerat quisque neque primis vivamus; imperdiet leo dapibus class. Dis dignissim placerat magnis tincidunt pharetra nulla consequat neque. Nostra adipiscing fermentum placerat aenean ad suscipit quam metus.

  // Pulvinar ut cras aliquam morbi montes interdum, nec montes hac. Vulputate est tortor nascetur magna arcu ante mus at leo. Nascetur molestie orci nec enim ipsum quis orci erat. Sapien aliquet vel congue nullam ultrices. Arcu turpis aptent lectus et faucibus metus ut. Purus libero pharetra et tempus viverra; augue magnis fringilla. Amet bibendum massa fringilla placerat habitant. Leo mus consequat quam efficitur primis.

  // Nibh tempus curabitur purus enim mus faucibus? Sagittis vitae consectetur vitae imperdiet scelerisque. Facilisi leo montes porttitor nostra leo lobortis euismod finibus. Congue arcu vehicula porttitor inceptos fermentum auctor. Volutpat nascetur lectus accumsan facilisis, habitasse a. Curabitur ligula curae lorem venenatis nisl.
  //     `.trim(),
  //       },
  //     ],
  //   },
  {
    formBlockType: FormBlockType.BRANCHING_NODE,
    buttons: [
      {
        label: "Next",
        submitsForm: false,
        branchFormBlocks: knollcroftBusinessBudgetRangeFormBlocks,
      },
    ],
  },
  {
    formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
    label: "Back",
  },
];
