import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";
import postcssNested from "postcss-nested";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// eslint-disable-next-line no-empty-pattern
export default defineConfig(({}) => {
  const entryFile = "src/main.tsx";

  return {
    plugins: [react(), cssInjectedByJsPlugin()],
    css: {
      postcss: {
        plugins: [autoprefixer, postcssNested],
      },
    },
    build: {
      lib: {
        entry: entryFile,
        name: "bifrost",
        fileName: "bifrost",
        formats: ["iife"],
      },
      rollupOptions: {
        input: { main: entryFile },
        output: {
          globals: {
            react: "React",
          },
        },
      },
    },
    define: {
      "process.env": {},
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
