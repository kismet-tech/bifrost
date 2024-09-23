import { Button } from "@/components/ui/button";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Example: Story = {
  args: {
    children: "Click Me",
  },
};
