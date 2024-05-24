
import { defineConfig } from "vite";
import * as viteBase from "../../vite.base";

export default defineConfig({
    plugins: viteBase.plugins,
    build: {
        lib: {
            entry: "src/index.ts",
            name: "brainsatplay",
            fileName: (format) => `brainsatplay.${format}.js`,
        },
        rollupOptions: viteBase.rollupOptions,
    },
})
