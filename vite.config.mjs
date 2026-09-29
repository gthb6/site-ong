import { defineConfig } from "vite";

import fs from "node:fs";

import path from "node:path";

export default defineConfig({
    root: "html",

    base: "./",

    plugins: [
        {
            name: "copiar-javascript",

            transformIndexHtml(html) {
                return html;
            },

            closeBundle() {
                const origem = path.resolve("js");
                const destino = path.resolve("dist/js");

                fs.cpSync(origem, destino, {
                    recursive: true
                });

                const arquivosHtml = [
                    "index.html",
                    "projetos.html",
                    "cadastro.html"
                ];

                arquivosHtml.forEach(function (arquivo) {
                    const caminho = path.resolve("dist", arquivo);

                    let conteudo = fs.readFileSync(caminho, "utf8");

                    conteudo = conteudo.replace(
                        /\.\.\/js\//g,
                        "./js/"
                    );

                    fs.writeFileSync(caminho, conteudo);
                });
            }
        }
    ],

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