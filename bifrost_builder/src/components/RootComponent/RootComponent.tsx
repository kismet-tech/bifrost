import { BifrostConfiguration } from "@/models/configuration";
import { BifrostSessionDataProvider } from "@/contexts/BifrostSessionDataProvider";
import { RootComponentWithProviders } from "./RootComponentWithProviders";
import { Auth0Provider } from "@auth0/auth0-react";

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
      <Auth0Provider
        domain="dev-b64zvp2l20i3cih3.us.auth0.com"
        clientId="WjxduglrgFtXshnC4Bv7YQJwXdEyvIcC"
        useRefreshTokens={false}
        cacheLocation="localstorage"
      >
        <BifrostSessionDataProvider>
          <RootComponentWithProviders
            bifrostTravelerId={bifrostTravelerId}
            bifrostConfiguration={bifrostConfiguration}
          />
        </BifrostSessionDataProvider>
      </Auth0Provider>
    </div>
  );
}
