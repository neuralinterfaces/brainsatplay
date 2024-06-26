

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            rollupTypes: true,
            include: [ "src/**/*.ts"]
        })
    ],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "device",
            fileName: (format) => `device.${format}.js`,
        },
    },
})