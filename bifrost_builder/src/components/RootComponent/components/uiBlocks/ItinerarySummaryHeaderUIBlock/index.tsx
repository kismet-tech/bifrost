import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CollapsedItinerarySummaryHeaderUIBlock } from "./CollapsedItinerarySummaryHeaderUIBlock";
import { ExpandedItinerarySummaryHeaderUIBlock } from "./ExpandedItinerarySummaryHeaderUIBlock";
import {
  ItinerarySummaryHeaderUIBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";

interface ItinerarySummaryHeaderUIBlockProps {
  configuration: ItinerarySummaryHeaderUIBlockConfiguration;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
}

export function ItinerarySummaryHeaderUIBlock({
  configuration,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
}: ItinerarySummaryHeaderUIBlockProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="relative bg-white p-4 rounded shadow-md">
      <div
        className="absolute top-0 right-0 cursor-pointer"
        onClick={toggleCollapse}
      >
        {isCollapsed ? <ChevronDown /> : <ChevronUp />}
      </div>

      {isCollapsed ? (
        <CollapsedItinerarySummaryHeaderUIBlock
          configuration={configuration}
          pushScreenConfigurationStack={pushScreenConfigurationStack}
          popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        />
      ) : (
        <ExpandedItinerarySummaryHeaderUIBlock
          configuration={configuration}
          pushScreenConfigurationStack={pushScreenConfigurationStack}
          popRightscreenConfigurationStack={popRightscreenConfigurationStack}
        />
      )}
    </div>
  );
}
