import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  nativeDate: Date | undefined;
  setNativeDate: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({
  nativeDate,
  setNativeDate,
  className,
}: DatePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !nativeDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {nativeDate ? (
              <>{format(nativeDate, "LLL dd, y")}</>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            selected={nativeDate}
            onSelect={setNativeDate}
            defaultMonth={nativeDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
