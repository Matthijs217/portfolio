// astro.config.mjs
import { defineConfig } from "astro/config";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from '@astrojs/cloudflare';
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId: 'r3k6w9b9',
      dataset: 'production',
      useCdn: true, // Enable CDN for better performance
      apiVersion: "2025-11-13", // insert the current date to access the latest version of the API
      studioBasePath: '/studio' // If you want to access the Studio on a route
    }),
    react(),
  ],
  vite: {
    define: {
      CESIUM_BASE_URL: JSON.stringify("/cesium"),
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
        },
      },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          { src: "node_modules/cesium/Build/Cesium/Workers", dest: "cesium" },
          { src: "node_modules/cesium/Build/Cesium/Assets", dest: "cesium" },
          { src: "node_modules/cesium/Build/Cesium/Widgets", dest: "cesium" },
          { src: "node_modules/cesium/Build/Cesium/ThirdParty", dest: "cesium" },
        ],
      }),
    ],
  },
});