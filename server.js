/* Local development server for the static site.
   Not used in production — the site is deployed as static files behind a CDN,
   where the headers in vercel.json apply. The same headers are mirrored here so
   that what you test locally matches what ships. */

const http = require('http');
const fs = require('fs');
const path = require('path');

const START_PORT = Number(process.env.PORT) || 3000;
const MAX_PORT_ATTEMPTS = 10;
const PUBLIC_DIR = __dirname;

const BLOCKED_FILES = new Set([
  'server.js',
  'package.json',
  'package-lock.json',
  'vercel.json'
]);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const ALLOWED_HOSTS = new Set([
  'metalmarvel.fi',
  'www.metalmarvel.fi',
  'localhost',
  '127.0.0.1'
]);

function isAllowedHost(hostHeader) {
  if (!hostHeader) return true;
  const host = hostHeader.split(':')[0].toLowerCase();
  if (ALLOWED_HOSTS.has(host)) return true;
  if (host.endsWith('.vercel.app') || host.endsWith('.vercel.dev')) return true;
  if (/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|127\.0\.0\.1|0\.0\.0\.0)/.test(host)) return true;
  if (host.endsWith('.local')) return true;
  return false;
}

/* Kept in step with vercel.json. Strict zero-trust security headers. */
const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data:",
    "media-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "connect-src 'self'"
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
};

function send(res, status, body, extraHeaders = {}) {
  res.writeHead(status, {
    'Content-Type': 'text/html; charset=UTF-8',
    ...SECURITY_HEADERS,
    ...extraHeaders
  });
  res.end(body);
}

/* Disallow dotfiles (.git, .github), node_modules, and sensitive project configuration files. */
function resolveWithinPublicDir(reqPath) {
  if (reqPath.startsWith('/.') || reqPath.startsWith('/node_modules') || reqPath.startsWith('/.git')) {
    return null;
  }
  const cleanName = path.basename(reqPath);
  if (BLOCKED_FILES.has(cleanName)) {
    return null;
  }
  const candidate = path.resolve(PUBLIC_DIR, '.' + reqPath);
  const rel = path.relative(PUBLIC_DIR, candidate);
  if (rel === '') return candidate;
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;
  return candidate;
}

function serveFileStream(filePath, stats, res) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
    'Content-Length': stats.size,
    ...SECURITY_HEADERS
  });

  const stream = fs.createReadStream(filePath);
  stream.on('error', () => res.destroy());
  res.on('close', () => stream.destroy());
  stream.pipe(res);
}

function handleRequest(req, res) {
  // Validate Host header against domain allowlist
  if (!isAllowedHost(req.headers.host)) {
    return send(res, 403, '<h1>403 Forbidden: Unauthorized Host</h1>');
  }

  let reqPath;
  try {
    reqPath = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    return send(res, 400, '<h1>400 Bad Request</h1>');
  }

  // Gracefully mock Vercel Insights during local development
  if (reqPath.startsWith('/_vercel/insights/script.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=UTF-8' });
    return res.end('/* Vercel Analytics Local Dev Mock */');
  }
  if (reqPath.startsWith('/_vercel/insights/view') || reqPath.startsWith('/_vercel/insights/event')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true }));
  }

  // Reject NUL bytes outright rather than letting them reach the filesystem.
  if (reqPath.includes('\0')) {
    return send(res, 400, '<h1>400 Bad Request</h1>');
  }

  if (reqPath.endsWith('/')) reqPath += 'index.html';

  const filePath = resolveWithinPublicDir(reqPath);
  if (!filePath) {
    return send(res, 403, '<h1>403 Forbidden</h1>');
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      return serveFileStream(filePath, stats, res);
    }

    // Clean URL fallback: try appending .html if bare slug requested (e.g. /valvonta -> /valvonta.html)
    if (!reqPath.endsWith('.html')) {
      const htmlPath = resolveWithinPublicDir(reqPath + '.html');
      if (htmlPath) {
        fs.stat(htmlPath, (htmlErr, htmlStats) => {
          if (!htmlErr && htmlStats.isFile()) {
            return serveFileStream(htmlPath, htmlStats, res);
          }
          return send(res, 404, '<h1>404 Not Found</h1>');
        });
        return;
      }
    }

    return send(res, 404, '<h1>404 Not Found</h1>');
  });
}

function createServer(port, attempt = 1) {
  const server = http.createServer(handleRequest);

  // Malformed request lines / oversized headers arrive here rather than as a
  // request; without a handler Node's default is fine, but being explicit keeps
  // the response consistent and the socket from lingering.
  server.on('clientError', (err, socket) => {
    if (socket.writable) socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    else socket.destroy();
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempt < MAX_PORT_ATTEMPTS) {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      createServer(port + 1, attempt + 1);
    } else if (err.code === 'EADDRINUSE') {
      console.error(
        `No free port found between ${START_PORT} and ${START_PORT + MAX_PORT_ATTEMPTS - 1}.`
      );
      process.exitCode = 1;
    } else {
      console.error(err);
      process.exitCode = 1;
    }
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

createServer(START_PORT);
