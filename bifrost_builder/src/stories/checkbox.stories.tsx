import { Checkbox } from "@/components/ui/checkbox";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Example: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
  args: {},
};
