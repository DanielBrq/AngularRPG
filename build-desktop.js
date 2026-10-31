import { $ } from 'bun';
import { readdir, copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

async function build() {
  console.log('1. Compilando Angular sin nombres hash...');
  await $`bunx ng build --output-hashing=none`;

  console.log('2. Generando el ejecutable Bun...');
  await mkdir('dist-server', { recursive: true });
  await $`bun build --compile --windows-hide-console --target=bun-windows-x64 --external webview ./server/server.mjs --outfile ./dist-server/mi-app.exe`;

  console.log('3. Copiando recursos de WebView...');
  const webviewDir = path.dirname(require.resolve('webview'));
  const binaries = path.join(webviewDir, 'bin', 'windows-amd64');
  const output = path.join('dist-server', 'webview');
  await mkdir(output, { recursive: true });
  for (const file of await readdir(binaries)) {
    await copyFile(path.join(binaries, file), path.join(output, file));
  }

  await copyFile('dist-server/mi-app.exe', 'mi-app.exe');
  console.log('\n¡Listo! Ejecutable generado: ./mi-app.exe');
}

build().catch((error) => {
  console.error('Falló la generación del ejecutable:', error);
  process.exitCode = 1;
});
