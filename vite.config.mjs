import { defineConfig } from "vite";

export default defineConfig({
    root: "html",
    base: "./",

    build: {
        outDir: "../dist",
        emptyOutDir: true,

        rollupOptions: {
            input: {
                index: "index.html",
                projetos: "projetos.html",
                cadastro: "cadastro.html"
            }
        }
    }
});
