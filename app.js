//app.js
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

function sendFile(res, filepath, contentType) {
  try {
    const data = fs.readFileSync(filepath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 File Not Found</h1>');
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Static CSS
  if (pathname === '/styles/style.css') {
    return sendFile(
      res,
      path.join(__dirname, 'styles', 'style.css'),
      'text/css',
    );
  }

  // Images
  if (pathname.startsWith('/images/')) {
    const imgPath = path.join(__dirname, pathname);
    const ext = path.extname(imgPath);
    const mime =
      { '.jpg': 'image/jpeg', '.png': 'image/png', '.jpeg': 'image/jpeg' }[
        ext
      ] || 'application/octet-stream';
    return sendFile(res, imgPath, mime);
  }

  // Routing pages
  if (pathname === '/' || pathname === '/home') {
    return sendFile(
      res,
      path.join(__dirname, 'templates', 'home.html'),
      'text/html',
    );
  }

  if (pathname === '/about') {
    return sendFile(
      res,
      path.join(__dirname, 'templates', 'about.html'),
      'text/html',
    );
  }

  if (pathname === '/contact') {
    return sendFile(
      res,
      path.join(__dirname, 'templates', 'contact.html'),
      'text/html',
    );
  }

  if (pathname === '/page') {
    return sendFile(
      res,
      path.join(__dirname, 'templates', 'page.html'),
      'text/html',
    );
  }

  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>Page Not Found</h1>');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
