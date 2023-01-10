import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Layouts from "vite-plugin-vue-layouts";
// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      "~": `${path.resolve(__dirname, "src")}`,
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                  @import "~/assets/style/variables.scss";
                  @import "~/assets/style/_mixin.scss";
                  `,
      },
    },
  },
  plugins: [
    vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      exclude: ["**/components/*.vue"],
    }),
    Layouts(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core", "vitest"],
      dts: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [],
      dts: true,
    }),
  ],
});
