import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const entryFile = "src/main.tsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "tourii",
    project: "bifrost_v2"
  })],

  build: {
    sourcemap: true,
    rollupOptions: {
      input: { main: entryFile },
      output: {
        globals: {
          react: "React",
        },
      },
    },
  }
})