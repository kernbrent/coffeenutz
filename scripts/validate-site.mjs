import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    if (entry === ".git" || entry === ".vscode") return [];
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function localTarget(url) {
  const clean = url.split("#")[0].split("?")[0];
  if (!clean || !clean.startsWith("/")) return null;
  const relative = decodeURIComponent(clean).replace(/^\//, "");
  if (!relative) return join(rootDir, "index.html");
  if (clean.endsWith("/")) return join(rootDir, relative, "index.html");
  if (extname(relative)) return join(rootDir, relative);
  return existsSync(join(rootDir, relative)) ? join(rootDir, relative) : join(rootDir, `${relative}.html`);
}

const allFiles = walk(rootDir);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const relative = file.slice(rootDir.length + 1).replaceAll("\\", "/");
  const html = readFileSync(file, "utf8");
  const titleCount = (html.match(/<title>[^<]+<\/title>/g) || []).length;
  const descriptionCount = (html.match(/<meta name="description" content="[^"]+">/g) || []).length;
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (titleCount !== 1) errors.push(`${relative}: expected one title, found ${titleCount}`);
  if (relative !== "404.html" && descriptionCount !== 1) errors.push(`${relative}: expected one meta description, found ${descriptionCount}`);
  if (h1Count !== 1) errors.push(`${relative}: expected one h1, found ${h1Count}`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) errors.push(`${relative}: duplicate ids ${[...new Set(duplicateIds)].join(", ")}`);

  for (const match of html.matchAll(/<(?:img)\b[^>]*>/g)) {
    if (!/\salt="[^"]*"/.test(match[0])) errors.push(`${relative}: image missing alt text`);
  }

  for (const match of html.matchAll(/(?:href|src|data-src)="([^"]+)"/g)) {
    const target = localTarget(match[1]);
    if (target && !existsSync(target)) errors.push(`${relative}: missing local target ${match[1]}`);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${relative}: invalid JSON-LD (${error.message})`);
    }
  }
}

const primaryPages = ["index.html", "menu/index.html", "why-coffee-nutz/index.html", "faq/index.html"];
for (const relative of primaryPages) {
  const html = readFileSync(join(rootDir, relative), "utf8");
  if (!/<link rel="canonical" href="https:\/\/coffee-nutz\.com\//.test(html)) errors.push(`${relative}: missing official canonical URL`);
  if (!/"@type": (?:"CafeOrCoffeeShop"|"FAQPage")/.test(html)) errors.push(`${relative}: missing structured business data`);
  if (/<meta name="robots" content="noindex/.test(html)) errors.push(`${relative}: primary page must remain indexable`);
  if (!/McKinney/i.test(html)) errors.push(`${relative}: missing visible local context`);
}

const conceptSlugs = ["pour-over-theatre", "family-table", "specialty-playground", "coffee-journal", "neighborhood-destination", "blue-man-forward"];
const conceptRoutes = ["index.html", "menu/index.html", "why-coffee-nutz/index.html", "faq/index.html"];
for (const slug of conceptSlugs) {
  for (const route of conceptRoutes) {
    const relative = `concepts/${slug}/${route}`;
    const html = readFileSync(join(rootDir, relative), "utf8");
    if (!/<meta name="robots" content="noindex, follow">/.test(html)) errors.push(`${relative}: concept preview must be noindex`);
    const base = `/concepts/${slug}/`;
    for (const expected of [base, `${base}menu/`, `${base}why-coffee-nutz/`, `${base}faq/`]) {
      if (!html.includes(`href="${expected}"`)) errors.push(`${relative}: missing themed navigation link ${expected}`);
    }
    const optionCount = (html.match(/<option value=/g) || []).length;
    if (optionCount !== 7) errors.push(`${relative}: design switcher should contain seven choices, found ${optionCount}`);
  }
}

const chooser = readFileSync(join(rootDir, "choose.html"), "utf8");
if (!chooser.includes('content="noindex, nofollow, noarchive"')) errors.push("choose.html: chooser must stay out of search results");

const combinedText = allFiles.filter((file) => [".html", ".xml", ".txt", ".md", ".js", ".css"].includes(extname(file))).map((file) => readFileSync(file, "utf8")).join("\n");
if (combinedText.includes("coffee.careersteps.net")) errors.push("Found stale coffee.careersteps.net search URL");
if (combinedText.includes("v=1.1.1")) errors.push("Found stale 1.1.1 asset reference");

if (errors.length) {
  console.error(`Validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages, ${conceptSlugs.length} complete concepts, local links, images, metadata, and JSON-LD.`);
