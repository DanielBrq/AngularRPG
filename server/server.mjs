import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { spawn } from 'node:child_process';
import { readFile, mkdtemp, cp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const webviewDir = path.dirname(require.resolve('webview'));
const webviewBin = path.join(webviewDir, 'bin', 'windows-amd64');
const extractedWebview = await mkdtemp(path.join(tmpdir(), 'angular-rpg-webview-'));
await cp(webviewBin, extractedWebview, { recursive: true });

const app = new Hono();

const angularDir = path.resolve('dist/AngularRPG/browser');
const contentTypes = {
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml'
};

app.get('*', async (c) => {
  const asset = path.resolve(angularDir, `.${decodeURIComponent(c.req.path)}`);
  if (asset.startsWith(`${angularDir}${path.sep}`)) {
    try {
      return new Response(await readFile(asset), {
        headers: { 'Content-Type': contentTypes[path.extname(asset)] ?? 'application/octet-stream' }
      });
    } catch {}
  }
  return new Response(await readFile(path.join(angularDir, 'index.html')), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
});

const port = 3000;
const url = `http://127.0.0.1:${port}`;

serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0'
}, () => {
  console.log('Servidor Hono listo. Levantando interfaz de escritorio...');
  const args = ['/url', url, '/title', 'Angular RPG', '/width', '1280', '/height', '720'];
  const window = spawn(path.join(extractedWebview, 'webview.exe'), args, {
    detached: true,
    stdio: 'ignore',
    cwd: extractedWebview
  });
  window.on('error', console.error);
  window.unref();
});
