import "@/globals.css";
import React from "react";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="kismet-dynamic-rfp-widget">
        <Story />
      </div>
    ),
  ],
};

export default preview;
