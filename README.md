# IMJ Sistemas — site institucional

Site institucional responsivo em HTML, CSS e TypeScript, com Vite e checagem estrita de tipos. Requer Node.js 22.18+ (ou Node.js 24+).

## Executar

```sh
npm install
npm run dev
```

Abra http://localhost:5174. Para gerar a pasta de publicação: `npm run build`. Publique o conteúdo de `dist/` em uma hospedagem estática.

## Conteúdo

Serviços incluem inteligência artificial. Clientes cadastrados: 1RI Goiânia, 2RI Goiânia, RI de Senador Canedo e 3RC de Goiânia, conforme informações fornecidas pela empresa.

Cinco páginas: início, quem somos, clientes, portfólio e contato. Os modelos tipados estão em `scripts/generate.ts`. `npm run dev` e `npm run build` geram as cinco páginas automaticamente. Ao editar os modelos durante uma sessão de desenvolvimento, rode `npm run generate`. O estilo está em `src/styles.css`, as interações em `src/main.ts` e as imagens em `public/assets/`. O Vite atualiza automaticamente as alterações de CSS e TypeScript no navegador.

Use `npm run typecheck` para verificar os tipos e `npm run build` para verificar tipos e gerar a versão de produção. `npm run preview` serve o build em http://localhost:4173. O JavaScript de produção é compilado pelo Vite; os fontes são TypeScript.

O formulário prepara um e-mail para contato@imjsistemas.com.br usando o aplicativo do visitante. Não há backend ou armazenamento. Há prévia e download do texto como alternativa. O envio depende do aplicativo de e-mail do usuário.

Portfólio cadastrado conforme informações da empresa: sites do Cartório de Senador Canedo, 3RC de Goiânia, 2RI Goiânia e Demarcki Advogados; sistemas de extração de XML com IA, ouvidoria e canal de denúncias. As capas são composições tipográficas, não capturas dos projetos. URLs e capturas podem ser adicionadas quando fornecidas. Antes da publicação: confirmar os textos institucionais e serviços. A fonte Google Fonts é opcional; há fontes de fallback locais.

