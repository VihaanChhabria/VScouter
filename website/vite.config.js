// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    base: isProd ? "/ui/" : "/",
    build: {
      outDir: "dist/ui",
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
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
      viteStaticCopy({
        targets: [
          {
            src: "public/_redirects",
            dest: "../", // goes to dist/ instead of dist/ui/ so that netlify can find it
          },
        ],
      }),
    ],
    server: {
      host: "localhost",
      port: 3000,
      strictPort: true,
    },
  };
});
