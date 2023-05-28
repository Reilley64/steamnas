import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import generouted from "@generouted/tanstack-react-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    generouted(),
  ],
});
