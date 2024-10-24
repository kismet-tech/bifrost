import { BifrostConfiguration } from "@/models/configuration";
import { BifrostSessionDataProvider } from "@/contexts/BifrostSessionDataProvider";
import { RootComponentWithProviders } from "./RootComponentWithProviders";

interface KismetRootComponentProps {
  bifrostTravelerId: string;
  bifrostConfiguration: BifrostConfiguration;
}

export function KismetRootComponent({
  bifrostTravelerId,
  bifrostConfiguration,
}: KismetRootComponentProps) {
  return (
    <div>
      <BifrostSessionDataProvider>
        <RootComponentWithProviders
          bifrostTravelerId={bifrostTravelerId}
          bifrostConfiguration={bifrostConfiguration}
        />
      </BifrostSessionDataProvider>
    </div>
  );
}
