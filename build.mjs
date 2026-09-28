import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'quem-somos.html', 'clientes.html', 'portfolio.html', 'contato.html', 'styles.css', 'app.js']) await copyFile(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true });
console.log('Site pronto em dist/');
