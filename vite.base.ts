
import dts from "vite-plugin-dts";

export const plugins = [
    dts({
        rollupTypes: true,
        include: [ "src/**/*.ts"]
    }),
]