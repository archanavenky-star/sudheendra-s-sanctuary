import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

async function loadEnvFile(file) {
  try {
    const text = await fs.readFile(file, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      value = value.replace(/^['"]|['"]$/g, "");
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // Optional env file.
  }
}

await loadEnvFile(path.join(root, ".env.local"));
await loadEnvFile(path.join(root, ".env"));

const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!url || !serviceKey) {
  console.error("Missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  console.error("Put them in your shell environment or .env.local. Never expose the service role key as VITE_*.");
  process.exit(1);
}

const seedPath = path.join(root, "scripts", "seed-content.json");
const articles = JSON.parse(await fs.readFile(seedPath, "utf8"));

const parseDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`Could not parse date: ${value}`);
  return date.toISOString();
};

const rows = articles.map((article) => ({
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt ?? "",
  body: article.body ?? "",
  type: article.type,
  series_title: article.seriesTitle ?? null,
  series_part: article.seriesPart ?? null,
  series_total_parts: article.seriesTotalParts ?? null,
  author_name: "Sudheendra Chaitanya",
  status: "published",
  published_at: parseDate(article.date),
}));

const response = await fetch(`${url}/rest/v1/blogs?on_conflict=slug`, {
  method: "POST",
  headers: {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  },
  body: JSON.stringify(rows),
});

if (!response.ok) {
  console.error("Supabase migration failed:", await response.text());
  process.exit(1);
}

console.log(`Migrated ${rows.length} existing writings to Supabase.`);
