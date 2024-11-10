import { Meta, StoryObj } from "@storybook/react";
import { useLayoutEffect } from "react";
import { KismetRootComponent } from "./components/RootComponent/RootComponent";
import { injectTheme } from "./injectDynamicRFP/replaceForm";
import { blueTheme, knollcroftTheme } from "./models/configuration/themes";
import { knollcroftV2RootScreenConfiguration } from "./getBifrostConfiguration/knollcroftV2Screens/screenConfigurations/knollcroftV2RootScreenConfiguration";

const meta: Meta<typeof KismetRootComponent> = {
  title: "KismetForm",
  component: KismetRootComponent,
};
export default meta;

type Story = StoryObj<typeof KismetRootComponent>;

export const Example: Story = {
  args: {
    bifrostTravelerId: "local_testing",
    bifrostConfiguration: {
      hotelId: "testing",
      bifrostFormId: "testing-1",
      rootScreenConfiguration: knollcroftV2RootScreenConfiguration,
    },
  },
};

export const WithBlueTheme: Story = {
  render: (args) => {
    useLayoutEffect(() => {
      const formContainer = document.querySelector(
        ".kismet-dynamic-rfp-widget"
      ) as HTMLDivElement;
      const themeVariables = args.bifrostConfiguration.themeVariables;

      if (formContainer && themeVariables) {
        // Apply a custom font
        formContainer.style.setProperty("font-family", "Outfit");

        // Apply the theme from the bifrost configuration
        // This will normally be done in our `replaceForm` function
        injectTheme(formContainer, themeVariables);
      }
    }, []);

    return <KismetRootComponent {...args} />;
  },
  args: {
    bifrostTravelerId: "local_testing",
    bifrostConfiguration: {
      hotelId: "testing",
      bifrostFormId: "testing-1",
      rootScreenConfiguration: knollcroftV2RootScreenConfiguration,
      themeVariables: blueTheme,
    },
  },
};

export const WithKnollcroftTheme: Story = {
  render: (args) => {
    useLayoutEffect(() => {
      const formContainer = document.querySelector(
        ".kismet-dynamic-rfp-widget"
      ) as HTMLDivElement;
      const themeVariables = args.bifrostConfiguration.themeVariables;

      if (formContainer && themeVariables) {
        // Apply the theme from the bifrost configuration
        // This will normally be done in our `replaceForm` function
        injectTheme(formContainer, themeVariables);
      }
    }, []);

    return <KismetRootComponent {...args} />;
  },
  args: {
    bifrostTravelerId: "local_testing",
    bifrostConfiguration: {
      hotelId: "testing",
      bifrostFormId: "testing-1",
      rootScreenConfiguration: knollcroftV2RootScreenConfiguration,
      themeVariables: knollcroftTheme,
    },
  },
};
