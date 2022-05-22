import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths({ root: "." })],
  define: {
    "process.env": process.env,
    global: {},
  },
  resolve: {
    alias: {
      web3: resolve(__dirname, "./node_modules/web3/dist/web3.min.js"),
    },
  },
});
