import { defineConfig } from "vite";
import inject from "@rollup/plugin-inject";
import ClassMangler from "../dist/index.mjs";

export default defineConfig({
    plugins: [
        inject({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        ClassMangler({
            dev: false,
            min: 2,     
            max: 8,     
            length: 8, 
            unwatchedClasses: ["burger-menu"]
        })
    ],
    publicDir: './src',
})