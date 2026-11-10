// Servidor mínimo (sin dependencias) para el sitio de práctica CalificaUT
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4000;
const PUBLIC = path.join(__dirname, 'public');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };

http.createServer((req, res) => {
  const ruta = req.url === '/' ? 'index.html' : req.url.split('?')[0];
  const archivo = path.join(PUBLIC, path.normalize(ruta));
  if (!archivo.startsWith(PUBLIC)) {
    res.writeHead(403);
    return res.end('Prohibido');
  }
  fs.readFile(archivo, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('No encontrado');
    }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`CalificaUT en http://localhost:${PORT}`));
