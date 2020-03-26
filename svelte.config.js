const sveltePreprocess = require("svelte-preprocess");
const mode = process.env.NODE_ENV;
const prod = mode === "production";

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./**/**/*.html", "./**/**/*.svelte"],

  whitelistPatterns: [/svelte-/],

  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  preprocess: sveltePreprocess({
    // ...svelte-preprocess options
    scss: {
      data: `@import './src/main.scss';`
    },
    babel: {
      presets: [
        [
          "@babel/preset-env",
          {
            loose: true,
            // No need for babel to resolve modules
            modules: false,
            targets: {
              // ! Very important. Target es6+
              esmodules: true
            }
          }
        ]
      ]
    },
    postcss: {
      plugins: [
        require("tailwindcss"),
        ...(prod ? [purgecss] : []),
        require("autoprefixer")
      ]
    }
  })
  // ...other svelte options
};
