export default {
  plugins: {
    "postcss-import": {
      from: "src/globals.css",
    },
    "@tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
