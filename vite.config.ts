import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  server: { host: '127.0.0.1', port: 5174 },
  preview: { host: '127.0.0.1', port: 4173 },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        ['index', 'quem-somos', 'clientes', 'portfolio', 'contato'].map(page => [
          page,
          fileURLToPath(new URL(`./${page}.html`, import.meta.url)),
        ]),
      ),
    },
  },
});
