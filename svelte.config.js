import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $lib: "src/lib",
    },
  },
  onwarn: (warning, handler) => {
    //Disable all a11y (accessibility) warnings
    if (warning.code.startsWith("a11y-")) {
      return;
    }
    handler(warning);
  },
};

export default config;
