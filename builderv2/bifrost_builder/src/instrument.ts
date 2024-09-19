import {
    BrowserClient,
    defaultStackParser,
    getDefaultIntegrations,
    makeFetchTransport,
    Scope,
} from "@sentry/browser";

// filter integrations that use the global variable
const integrations = getDefaultIntegrations({}).filter(
    (defaultIntegration) => {
        return !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(
            defaultIntegration.name,
        );
    },
);

const client = new BrowserClient({
    dsn: "https://2141b484fadd019de837b7156db48a07@o4507415502389248.ingest.us.sentry.io/4507981005258752",
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations: integrations,
});

const scope = new Scope();
scope.setClient(client);

client.init(); // initializing has to be done after setting the client on the scope

// You can capture exceptions manually for this client like this:
scope.captureException(new Error("example"));
