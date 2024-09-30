import * as React from "react";

import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Checkbox } from "./checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./dialog";

export interface ExpandableSelectionCardProps {
  imageSrc: string;
  name: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const ExpandableSelectionCard = React.forwardRef<
  HTMLDivElement,
  ExpandableSelectionCardProps
>((props, ref) => {
  const id = React.useId();
  return (
    <Card
      ref={ref}
      className={cn("overflow-hidden max-w-[350px]", props.className)}
    >
      <Dialog>
        <DialogTrigger className="relative cursor-pointer">
          <img
            src={props.imageSrc}
            alt={`${props.name} image`}
            className="w-full h-auto max-h-[350px] object-cover"
          />
          <InfoIcon className="absolute top-4 left-4 text-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.95)]" />
        </DialogTrigger>
        <DialogContent className="overflow-auto">
          <DialogHeader>{props.name}</DialogHeader>
          <img
            src={props.imageSrc}
            alt={`${props.name} image`}
            className="w-full h-auto object-cover"
          />
          <div className="text-base leading-normal whitespace-pre-wrap">
            {props.description}
          </div>
          <div className="flex gap-3">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  props.onChange(!props.checked);
                }}
              >
                {props.checked ? "Unselect" : "Select"}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <label
        htmlFor={id}
        className="flex items-center gap-3 p-4 cursor-pointer"
      >
        <Checkbox
          id={id}
          checked={props.checked}
          onCheckedChange={(checked) =>
            props.onChange(typeof checked === "boolean" ? checked : false)
          }
        />
        <span className="text-base font-medium leading-none">{props.name}</span>
      </label>
    </Card>
  );
});
ExpandableSelectionCard.displayName = "ExpandableSelectionCard";

export { ExpandableSelectionCard };
