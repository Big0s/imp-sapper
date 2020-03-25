const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess({
    // ...svelte-preprocess options
    scss: true,
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
      plugins: [require("autoprefixer")]
    }
  })
  // ...other svelte options
};
