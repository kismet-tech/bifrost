import { ExpandableSelectionCard } from "@/components/ui/expandable-selection-card";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof ExpandableSelectionCard> = {
  title: "Components/ExpandableSelectionCard",
  component: ExpandableSelectionCard,
};
export default meta;

type Story = StoryObj<typeof ExpandableSelectionCard>;

export const Example: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <ExpandableSelectionCard
        {...args}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  args: {
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=3473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "King Bed Suite",
    description: `
Lorem ipsum odor amet, consectetuer adipiscing elit. Bibendum hendrerit consequat nascetur cras magnis primis cubilia conubia. Ipsum augue aliquam scelerisque duis consectetur nulla blandit morbi sociosqu. Ante placerat quisque neque primis vivamus; imperdiet leo dapibus class. Dis dignissim placerat magnis tincidunt pharetra nulla consequat neque. Nostra adipiscing fermentum placerat aenean ad suscipit quam metus.

Pulvinar ut cras aliquam morbi montes interdum, nec montes hac. Vulputate est tortor nascetur magna arcu ante mus at leo. Nascetur molestie orci nec enim ipsum quis orci erat. Sapien aliquet vel congue nullam ultrices. Arcu turpis aptent lectus et faucibus metus ut. Purus libero pharetra et tempus viverra; augue magnis fringilla. Amet bibendum massa fringilla placerat habitant. Leo mus consequat quam efficitur primis.

Nibh tempus curabitur purus enim mus faucibus? Sagittis vitae consectetur vitae imperdiet scelerisque. Facilisi leo montes porttitor nostra leo lobortis euismod finibus. Congue arcu vehicula porttitor inceptos fermentum auctor. Volutpat nascetur lectus accumsan facilisis, habitasse a. Curabitur ligula curae lorem venenatis nisl.
    `.trim(),
  },
};
