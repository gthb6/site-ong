# Instituto Esperança

Projeto de site para o Instituto Esperança, desenvolvido como atividade prática do curso de Análise e Desenvolvimento de Sistemas.

O site apresenta a ONG, seus projetos e um formulário para cadastro de apoiadores.

## Estrutura

- `html/` – páginas do site
- `css/` – estilos
- `js/` – funções de interação, formulário e armazenamento
- `imagens/` – imagens usadas no projeto
- `dist/` – arquivos gerados pela build do Vite

## Como executar

É necessário ter o Node.js instalado.

Depois de baixar o projeto, abra a pasta no VS Code e execute:

```bash
npm install
npm run dev
```

O Vite vai informar o endereço local para abrir o site no navegador.

Para gerar a versão de produção:

```bash
npm run build
```

A build é criada na pasta `dist/`.

## Acessibilidade

Foram adicionados recursos como atalho para pular direto ao conteúdo, navegação identificada, indicação da página atual, foco visível, menu com estado informado para tecnologias assistivas, fechamento do modal com `Esc` e retorno do foco para o botão que abriu a janela. O formulário também possui rótulos associados aos campos e atributos de preenchimento automático.

## Git

O projeto usa Git com as branches `main`, `develop` e `feature/acessibilidade`. Os commits seguem o padrão de Conventional Commits.

A primeira versão está marcada com a tag `v1.0.0`.
