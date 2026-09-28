import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const ext = path.extname(file);
    if (!types[ext]) { res.writeHead(404).end('Página não encontrada'); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[ext] }); res.end(body);
  } catch { res.writeHead(404).end('Página não encontrada'); }
}).listen(Number(process.env.PORT) || 5174, '127.0.0.1', () => console.log(`IMJ: http://localhost:${Number(process.env.PORT) || 5174}`));
