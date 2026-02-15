// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => {
  return {
    // base: isProd ? "/ui/" : "/",
    // build: {
    //   outDir: "dist/ui",
    // },
    base: "/",
    plugins: [
      react(),
      VitePWA({
        base: "/",
        scope: "/",
        registerType: "autoUpdate",
        manifest: {
          theme_color: "#3A3B3E",
          background_color: "#3A3B3E",
        },
        devOptions: {
          enabled: false,
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.destination === "document",
              handler: "StaleWhileRevalidate",
              options: { cacheName: "html-cache" },
            },
            {
              urlPattern: ({ request }) => request.destination === "script",
              handler: "StaleWhileRevalidate",
              options: { cacheName: "js-cache" },
            },
            {
              urlPattern: ({ request }) => request.destination === "style",
              handler: "StaleWhileRevalidate",
              options: { cacheName: "css-cache" },
            },
            {
              urlPattern: ({ request }) => request.destination === "image",
              handler: "StaleWhileRevalidate",
              options: { cacheName: "image-cache" },
            },
          ],
        },
      }),
    ],
    server: {
      host: "localhost",
      port: 3000,
      strictPort: true,
    },
  };
});
