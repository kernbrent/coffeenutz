import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const concepts = ["pour-over-theatre", "family-table", "specialty-playground", "coffee-journal", "neighborhood-destination", "blue-man-forward"];
const pageSuffixes = ["", "menu/", "why-coffee-nutz/", "faq/"];
const routes = ["/", "/menu/", "/why-coffee-nutz/", "/faq/", "/choose.html", ...concepts.flatMap((concept) => pageSuffixes.map((suffix) => `/concepts/${concept}/${suffix}`))];
const contentTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".webp": "image/webp" };

const server = createServer((request, response) => {
  const pathname = new URL(request.url, "http://127.0.0.1").pathname;
  const relative = pathname === "/" ? "index.html" : pathname.endsWith("/") ? `${pathname.slice(1)}index.html` : pathname.slice(1);
  const file = normalize(join(rootDir, relative));
  if (!file.startsWith(rootDir) || !existsSync(file)) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": contentTypes[extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(response);
});

await new Promise((resolveServer) => server.listen(0, "127.0.0.1", resolveServer));
const { port } = server.address();

try {
  for (const route of routes) {
    const response = await fetch(`http://127.0.0.1:${port}${route}`);
    if (!response.ok) throw new Error(`${route} returned ${response.status}`);
    if (!(response.headers.get("content-type") || "").startsWith("text/html")) throw new Error(`${route} did not return HTML`);
  }
  console.log(`Smoke-tested ${routes.length} routes successfully.`);
} finally {
  await new Promise((resolveClose, rejectClose) => server.close((error) => error ? rejectClose(error) : resolveClose()));
}
