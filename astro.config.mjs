import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ai-ocko.github.io",
  base: "/Web_Dev_Hell",
  trailingSlash: "ignore",
  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },
});
