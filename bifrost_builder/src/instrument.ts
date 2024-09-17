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
scope.setTag("my-tag", "my value");
scope.setUser({
    id: 42,
    email: "john.doe@example.com",
});
scope.setClient(client);

// Initialize the client only once, after setting the scope
client.init();

console.log("Kismet Sentry initialized");

// Function to capture exception with the predefined scope
export const sentryCaptureException = (exception: Error) => {
    console.log("Kismet Sentry exception start");
    // Capture exception using the existing client and scope
    client.captureException(exception, undefined, scope);
    console.log("Kismet Sentry exception captured");
};

// Export the scope if needed elsewhere
export const sentryScope = scope;


// import {
//     BrowserClient,
//     defaultStackParser,
//     getDefaultIntegrations,
//     makeFetchTransport,
//     Scope,
// } from "@sentry/browser";

// // filter integrations that use the global variable
// const integrations = getDefaultIntegrations({}).filter(
//     (defaultIntegration) => {
//         return !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(
//             defaultIntegration.name,
//         );
//     },
// );

// const client = new BrowserClient({
//     dsn: "https://5a1c71f14a4c8e7f2cc3a13f2bc9528a@o4507415502389248.ingest.us.sentry.io/4507969028620288",
//     transport: makeFetchTransport,
//     stackParser: defaultStackParser,
//     integrations: integrations,
// });

// export const sentryCaptureException = (exception: Error) => {
//     console.log("Kismet Sentry exception start");
//     const scope = new Scope();
//     scope.setClient(client);
//     client.init();
//     scope.setTag("my-tag", "my value");
//     scope.setUser({
//         id: 42,
//         email: "john.doe@example.com",
//     });
//     scope.captureException(exception);
//     console.log("Kismet Sentry exception captured");
// };

// const scope = new Scope();
// scope.setClient(client);
// client.init(); // initializing has to be done after setting the client on the scope

// console.log("Kismet Sentry initialized");

// export const sentryScope = scope;
