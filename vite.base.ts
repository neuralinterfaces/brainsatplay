
import dts from "vite-plugin-dts";

export const plugins = [
    dts({
      insertTypesEntry: true,
    }),
]

export const rollupOptions = {
    external: ["@capacitor/core"],
    output: {
        globals: {
            "@capacitor/core": "Capacitor",
        },
    },
}