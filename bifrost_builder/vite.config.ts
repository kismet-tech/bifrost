import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { version } from "./package.json";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// eslint-disable-next-line no-empty-pattern
export default defineConfig(({}) => {
  const entryFile = "src/main.tsx";

  return {
    plugins: [react(), svgr(), nodePolyfills(), cssInjectedByJsPlugin()],
    css: {
      postcss: "./postcss.config.js",
    },
    build: {
      minify: false,
      lib: {
        entry: entryFile,
        name: "bifrost",
        fileName: "bifrost",
        formats: ["iife"],
      },
      rollupOptions: {
        input: { main: entryFile },
        compact: false,
        preferConst: true,
        output: {
          globals: {
            react: "React",
          },
        },
      },
    },
    define: {
      "process.env": {},
      __SENTRY_ENV__: JSON.stringify(process.env.SENTRY_ENV),
      __APP_VERSION__: JSON.stringify(version),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        zlib: "browserify-zlib",
      },
    },
  };
});
