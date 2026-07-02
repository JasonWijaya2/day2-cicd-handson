const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');
fs.mkdirSync(distDir, { recursive: true });

// 1) SOURCE: kumpulkan file .js di src/
const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.js'));

// 2) COMPILE (validasi sintaks): require tiap modul, gagal = sintaks rusak
for (const f of files) require(path.join(srcDir, f));

// 3) BUNDLE: gabungkan isi semua file
const bundle = files
  .map((f) => `// ==== ${f} ====\n` + fs.readFileSync(path.join(srcDir, f), 'utf8'))
  .join('\n\n');
fs.writeFileSync(path.join(distDir, 'bundle.js'), bundle);

// 4) ARTIFACT: manifest untuk traceability
fs.writeFileSync(
  path.join(distDir, 'manifest.json'),
  JSON.stringify({ files, bytes: Buffer.byteLength(bundle), status: 'ready' }, null, 2)
);

console.log(`🎁 Bundle dibuat: dist/bundle.js (${files.length} modul, ${Buffer.byteLength(bundle)} bytes)`);