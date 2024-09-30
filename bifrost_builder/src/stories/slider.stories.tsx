import { Slider } from "@/components/ui/slider";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Example: Story = {
  args: {
    defaultValue: [25, 75],
    minStepsBetweenThumbs: 1,
  },
};
