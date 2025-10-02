// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Path to your dist folder
const dist = path.join(__dirname, 'dist');
const basePath = '/my-site';  // <--- Add your base here

const mimeTypes = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

// Helper to safely resolve file paths within dist
function safeDistPath(urlPath) {
  // Remove query string/fragments
  urlPath = urlPath.split('?')[0].split('#')[0];
  
  // Remove base path prefix
  if (urlPath.startsWith(basePath)) {
    urlPath = urlPath.slice(basePath.length);
    if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;
  }
  
  // Prevent directory traversal
  const safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
  return path.join(dist, safePath);
}

http.createServer((req, res) => {
  let filePath = safeDistPath(req.url);

  // If requesting root or /my-site/, serve index.html
  if (req.url === basePath || req.url === basePath + '/' || req.url === '/' || req.url === '') {
    filePath = path.join(dist, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // For SPA: fallback to index.html for unknown routes with no file extension
    if (path.extname(req.url) === '' || path.extname(req.url.replace(basePath, '')) === '') {
      const indexPath = path.join(dist, 'index.html');
      fs.readFile(indexPath, (err, content) => {
        if (err) {
          res.writeHead(404);
          return res.end('Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      });
      return;
    }

    res.writeHead(404);
    res.end('Not Found');
  });
}).listen(3000, () => {
  console.log(`Static server running at http://localhost:3000${basePath}`);
});