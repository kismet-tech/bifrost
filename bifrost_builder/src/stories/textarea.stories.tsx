import { Textarea } from "@/components/ui/textarea";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Example: Story = {
  args: {},
};
