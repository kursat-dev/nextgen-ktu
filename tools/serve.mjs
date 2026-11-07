#!/usr/bin/env node
// Local preview server for the exported site (no caching, correct MIME types).
//   node tools/serve.mjs [port]      → http://localhost:4173
// The site must be served from the domain root: the Framer runtime and the
// service worker resolve assets as "/assets/…".

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "uplink-copy-site");
const PORT = Number(process.argv[2] || process.env.PORT || 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".pbf": "application/x-protobuf",
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    path = normalize(path).replace(/^(\.\.[/\\])+/, "");
    let file = join(ROOT, path);
    if (!file.startsWith(ROOT)) throw Object.assign(new Error("forbidden"), { code: "ENOENT" });
    if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(body);
  } catch {
    // Like most static hosts: unknown URLs get /404.html with a 404 status.
    const page = await readFile(join(ROOT, "404.html")).catch(() => "404");
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    res.end(page);
  }
}).listen(PORT, "127.0.0.1", () => console.log(`NextGen KTÜ preview → http://localhost:${PORT}`));
