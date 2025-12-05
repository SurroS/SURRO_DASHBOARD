import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    // Mock CSS imports before PostCSS processing to prevent lightningcss dependency
    {
      name: "mock-css",
      enforce: "pre",
      load(id) {
        if (
          id.endsWith(".css") ||
          id.endsWith(".scss") ||
          id.endsWith(".sass") ||
          id.endsWith(".less")
        ) {
          return "export default {};";
        }
      },
      resolveId(id) {
        // Prevent CSS files from being processed by PostCSS
        if (
          id.endsWith(".css") ||
          id.endsWith(".scss") ||
          id.endsWith(".sass") ||
          id.endsWith(".less")
        ) {
          return id;
        }
      },
    },
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [
      "./tests/setup/vitest-setup.ts",
      "./tests/setup/msw-server.ts",
    ],
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", ".next", "tests/e2e"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    // Disable PostCSS processing in test environment to avoid lightningcss dependency
    postcss: false,
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  optimizeDeps: {
    // Exclude native modules from Vite's dependency optimization
    exclude: [
      "lightningcss",
      "lightningcss-darwin-arm64",
      "lightningcss-darwin-x64",
      "lightningcss-freebsd-x64",
      "lightningcss-linux-arm-gnueabihf",
      "lightningcss-linux-x64-gnu",
      "lightningcss-linux-x64-musl",
      "lightningcss-linux-arm64-gnu",
      "lightningcss-linux-arm64-musl",
      "lightningcss-win32-x64-msvc",
      "lightningcss-win32-arm64-msvc",
      "@tailwindcss/postcss",
    ],
  },
  ssr: {
    // Externalize native modules to prevent SSR bundling issues
    external: [
      "lightningcss",
      "lightningcss-darwin-arm64",
      "lightningcss-darwin-x64",
      "lightningcss-freebsd-x64",
      "lightningcss-linux-arm-gnueabihf",
      "lightningcss-linux-x64-gnu",
      "lightningcss-linux-x64-musl",
      "lightningcss-linux-arm64-gnu",
      "lightningcss-linux-arm64-musl",
      "lightningcss-win32-x64-msvc",
      "lightningcss-win32-arm64-msvc",
      "@tailwindcss/postcss",
    ],
  },
});
