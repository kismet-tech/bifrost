import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
};
export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Example: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(2024, 0, 20),
      to: addDays(new Date(2024, 0, 20), 20),
    });

    return (
      <DateRangePicker
        {...args}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    );
  },
  args: {},
};
