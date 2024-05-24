import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            name: "muse",
            fileName: (format) => `muse.${format}.js`,
        }
    },
})