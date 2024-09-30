import { KismetForm } from "./components/KismetForm";
import { Meta, StoryObj } from "@storybook/react";
import { knollcroftFormBlocks } from "./getBifrostConfiguration/knollcroftFormBlocks";

const meta: Meta<typeof KismetForm> = {
  title: "KismetForm",
  component: KismetForm,
};
export default meta;

type Story = StoryObj<typeof KismetForm>;

export const Example: Story = {
  args: {
    bifrostTravelerId: "local_testing",
    bifrostConfiguration: {
      hotelId: "testing",
      bifrostFormId: "testing-1",
      formBlocks: knollcroftFormBlocks,
    },
  },
};
