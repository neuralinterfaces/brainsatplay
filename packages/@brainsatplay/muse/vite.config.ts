

import { defineConfig } from "vite";
import * as viteBase from "../../../vite.base";

export default defineConfig({
    plugins: viteBase.plugins,
    build: {
        lib: {
            entry: "src/index.ts",
            name: "muse",
            fileName: (format) => `muse.${format}.js`,
        },
    },
})