
import dts from "vite-plugin-dts";

export const plugins = [
    dts({
        outDir: './dist',
        rollupTypes: true,
        include: [ "src/**/*.ts"]
    }),
]