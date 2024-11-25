import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpandedItinerarySummaryHeaderPackageBody } from "./ExpandedItinerarySummaryHeaderPackageBody";
import { ExpandedItinerarySummaryHeaderItineraryBody } from "./ExpandedItinerarySummaryHeaderItineraryBody.tsx";

interface ExpandedItinerarySummaryHeaderBodyProps {}

enum ExpandedItinerarySummaryHeaderBodyTabs {
  Itinerary = "Itinerary",
  Package = "Package",
}

export function ExpandedItinerarySummaryHeaderBody({}: ExpandedItinerarySummaryHeaderBodyProps) {
  return (
    <Tabs
      defaultValue={ExpandedItinerarySummaryHeaderBodyTabs.Itinerary}
      className="w-[400px]"
    >
      <TabsContent value={ExpandedItinerarySummaryHeaderBodyTabs.Itinerary}>
        <ExpandedItinerarySummaryHeaderItineraryBody />
      </TabsContent>
      <TabsContent value={ExpandedItinerarySummaryHeaderBodyTabs.Package}>
        <ExpandedItinerarySummaryHeaderPackageBody />
      </TabsContent>

      <TabsList>
        <TabsTrigger value={ExpandedItinerarySummaryHeaderBodyTabs.Itinerary}>
          {ExpandedItinerarySummaryHeaderBodyTabs.Itinerary}
        </TabsTrigger>
        <TabsTrigger value={ExpandedItinerarySummaryHeaderBodyTabs.Package}>
          {ExpandedItinerarySummaryHeaderBodyTabs.Package}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
