import {
    BrowserClient,
    defaultStackParser,
    getDefaultIntegrations,
    makeFetchTransport,
    Scope,
} from "@sentry/browser";

// Filter out integrations that use the global variable
const integrations = getDefaultIntegrations({}).filter(
    (defaultIntegration) => {
        return !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(
            defaultIntegration.name,
        );
    },
);

// Initialize the Sentry client only once
const client = new BrowserClient({
    dsn: "https://5a1c71f14a4c8e7f2cc3a13f2bc9528a@o4507415502389248.ingest.us.sentry.io/4507969028620288",
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations: integrations,
});

// Initialize the scope once
const scope = new Scope();
scope.setClient(client);
// Initialize the client only once, after setting the scope
client.init();

console.log("Kismet Sentry initialized");

// Export the scope if needed elsewhere
export const sentryScope = scope;

// usage example
// import { sentryScope } from "./instrument";
// const error = new Error("FORM submission error"); // OR use existing error
// error.name = "FORM_SUBMISSION_ERROR";
// sentryScope.setExtra("version", __APP_VERSION__);
// sentryScope.captureException(error);
