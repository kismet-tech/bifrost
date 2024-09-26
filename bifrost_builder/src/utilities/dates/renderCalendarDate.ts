import { CalendarDate } from "@/models/CalendarDate";

export interface RenderCalendarDateProps {
  calendarDate: CalendarDate;
}

export const renderCalendarDate = ({
  calendarDate,
}: RenderCalendarDateProps): string => {
  const { year, month, day, timeZone } = calendarDate;

  // Create a Date object from the CalendarDate object
  const date: Date = new Date(
    year,
    // JavaScript months are 0-based, subtract 1 from the month to convert it from 1-based to 0-based
    month - 1,
    day
  );

  // Get today's date and yesterday's date
  const today: Date = new Date();
  const yesterday: Date = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Function to format date to 'Monday, June 3rd'
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to get ordinal suffix for a day
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"; // Covers 11th to 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Check if the date is today
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  // Check if the date is yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // Otherwise, return the formatted date string
  const dayOfMonth: number = date.getDate();
  const formattedDate: string = formatDate(date);
  const dayWithSuffix = `${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}`;

  return formattedDate.replace(dayOfMonth.toString(), dayWithSuffix);
};
