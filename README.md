# IMJ Sistemas — site institucional

Site responsivo em HTML, CSS e JavaScript, sem dependências de instalação.

## Executar

```sh
npm run dev
```

Abra http://localhost:5174. Para gerar a pasta de publicação: `npm run build`. Publique o conteúdo de `dist/` em uma hospedagem estática.

## Conteúdo

Serviços incluem inteligência artificial. Clientes cadastrados: 1RI Goiânia, 2RI Goiânia, RI de Senador Canedo e 3RC de Goiânia, conforme informações fornecidas pela empresa.

Cinco páginas: início, quem somos, clientes, portfólio e contato. Os modelos estão em `generate.mjs`; após editá-los, execute `node generate.mjs` e `npm run build`. O estilo está em `styles.css` e as interações em `app.js`.

O formulário prepara um e-mail para contato@imjsistemas.com.br usando o aplicativo do visitante. Não há backend ou armazenamento. Há prévia e download do texto como alternativa. O envio depende do aplicativo de e-mail do usuário.

Portfólio cadastrado conforme informações da empresa: sites do Cartório de Senador Canedo, 3RC de Goiânia, 2RI Goiânia e Demarcki Advogados; sistemas de extração de XML com IA, ouvidoria e canal de denúncias. As capas são composições tipográficas, não capturas dos projetos. URLs e capturas podem ser adicionadas quando fornecidas. Antes da publicação: confirmar os textos institucionais e serviços. A fonte Google Fonts é opcional; há fontes de fallback locais.

