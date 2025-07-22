import { fileURLToPath, URL } from "node:url" // Use the "node:" prefix
//import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This is the most robust way
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})