import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            name: "brainsatplay",
            fileName: (format) => `brainsatplay.${format}.js`,
        }
    },
})