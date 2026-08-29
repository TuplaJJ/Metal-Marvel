/* HTTP server for the site. Serves local development AND production.

   This is NOT a dev-only script. Vercel builds the project with framework
   "node" and reports "Using server.js as the root entrypoint", so production
   requests are answered by this file rather than by static files behind a CDN.
   The headers below are consequently the ones that ship: a header changed only
   in vercel.json never reaches production, because the response is written
   here. Keep the two files in step, and treat this list as authoritative. */

const http = require('http');
const fs = require('fs');
const path = require('path');

const START_PORT = Number(process.env.PORT) || 3000;
const MAX_PORT_ATTEMPTS = 10;
const PUBLIC_DIR = fs.existsSync(path.join(__dirname, 'metalmarvel-website'))
  ? path.join(__dirname, 'metalmarvel-website')
  : __dirname;

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

/* Kept in step with vercel.json. Strict zero-trust security headers.

   script-src has no 'unsafe-inline': the only inline <script> left on either
   page (the Vercel Analytics window.va snippet) is allowlisted by exact hash
   instead. JSON-LD blocks don't need a hash — type="application/ld+json" is
   inert data, not executable script, so CSP's script-src doesn't govern it.
   If that inline script's content ever changes, recompute the hash with:
     node -e "console.log('sha256-' + require('crypto').createHash('sha256').update('EXACT_SCRIPT_TEXT','utf8').digest('base64'))"
   using the exact text between the <script> tags (including whitespace) from
   metalmarvel-website/index.html and valvonta.html — both currently match. */
const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'sha256-ONRZYZuShNwVHh3BUwUvQfVbsjTNyL0canAx8F8t4SY='",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data:",
    "media-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "connect-src 'self'",
    /* Present in vercel.json but previously missing here, so production — which
       is served from this file — shipped a CSP two directives short of the
       documented one. Harmless in practice (the site loads no http:// resource
       and HSTS is preloaded), but the two must agree to stay auditable.
       Neither affects local development: both exempt localhost, which browsers
       already treat as a trustworthy origin. */
    'upgrade-insecure-requests',
    'block-all-mixed-content'
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
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

  // Rewrite clean section routes to index.html
  if (reqPath === '/palvelut' || reqPath === '/meista' || reqPath === '/yhteystiedot') {
    reqPath = '/index.html';
  }

  /* Blocked paths answer 404, not 403: a distinct "forbidden" reply would confirm
     that server.js, vercel.json, .git and friends exist, letting someone map the
     project layout by probing. Missing and off-limits look identical. */
  const filePath = resolveWithinPublicDir(reqPath);
  if (!filePath) {
    return send(res, 404, '<h1>404 Not Found</h1>');
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
      /* Code only — the full error object carries a stack trace and absolute
         filesystem paths, which do not belong in terminal output or CI logs. */
      console.error(`Server failed to start (${err.code || 'unknown error'}).`);
      process.exitCode = 1;
    }
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

createServer(START_PORT);
