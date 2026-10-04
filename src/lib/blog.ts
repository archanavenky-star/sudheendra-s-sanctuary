import type { Article } from "@/data/content";
import { articles as fallbackArticles } from "@/data/content";
import { supabaseFetch, isSupabaseConfigured } from "@/lib/supabase";

export type BlogStatus = "draft" | "published";
export type BlogType = Article["type"];

export interface Blog extends Article {
  id?: string;
  status: BlogStatus;
  cover_image_url?: string | null;
  author_name?: string;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BlogInput {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  type: BlogType;
  seriesTitle?: string;
  seriesPart?: number;
  seriesTotalParts?: number;
  coverImageUrl?: string;
  authorName?: string;
  status: BlogStatus;
  publishedAt?: string | null;
}

const fromRow = (row: any): Blog => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt ?? "",
  body: row.body ?? "",
  type: row.type,
  date: row.published_at ? formatDate(row.published_at) : "Draft",
  seriesTitle: row.series_title ?? undefined,
  seriesPart: row.series_part ?? undefined,
  seriesTotalParts: row.series_total_parts ?? undefined,
  status: row.status,
  cover_image_url: row.cover_image_url ?? null,
  author_name: row.author_name ?? "Sudheendra Chaitanya",
  published_at: row.published_at ?? null,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

export const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
};

const fallback = (): Blog[] => fallbackArticles.map((article) => ({ ...article, status: "published" as const }));

export async function listPublishedBlogs(): Promise<Blog[]> {
  if (!isSupabaseConfigured) return fallback();
  const rows = await supabaseFetch<any[]>("/rest/v1/blogs?select=*&status=eq.published&order=published_at.desc");
  return rows.map(fromRow);
}

export async function listAdminBlogs(): Promise<Blog[]> {
  const rows = await supabaseFetch<any[]>("/rest/v1/blogs?select=*&order=updated_at.desc");
  return rows.map(fromRow);
}

export async function getPublishedBlogBySlug(slug: string): Promise<Blog | undefined> {
  if (!isSupabaseConfigured) return fallback().find((article) => article.slug === slug);
  const rows = await supabaseFetch<any[]>(`/rest/v1/blogs?select=*&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`);
  return rows[0] ? fromRow(rows[0]) : undefined;
}

export async function getAdminBlog(id: string): Promise<Blog | undefined> {
  const rows = await supabaseFetch<any[]>(`/rest/v1/blogs?select=*&id=eq.${encodeURIComponent(id)}&limit=1`);
  return rows[0] ? fromRow(rows[0]) : undefined;
}

const toRow = (input: BlogInput) => ({
  slug: input.slug,
  title: input.title,
  excerpt: input.excerpt,
  body: input.body,
  type: input.type,
  series_title: input.seriesTitle || null,
  series_part: input.seriesPart || null,
  series_total_parts: input.seriesTotalParts || null,
  cover_image_url: input.coverImageUrl || null,
  author_name: input.authorName || "Sudheendra Chaitanya",
  status: input.status,
  published_at: input.status === "published" ? (input.publishedAt || new Date().toISOString()) : null,
});

export async function createBlog(input: BlogInput): Promise<Blog> {
  const rows = await supabaseFetch<any[]>("/rest/v1/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(toRow(input)),
  });
  return fromRow(rows[0]);
}

export async function updateBlog(id: string, input: BlogInput): Promise<Blog> {
  const rows = await supabaseFetch<any[]>(`/rest/v1/blogs?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(toRow(input)),
  });
  return fromRow(rows[0]);
}

export async function deleteBlog(id: string): Promise<void> {
  await supabaseFetch(`/rest/v1/blogs?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
}

export function getSeriesGroups(items: Blog[]): { title: string; articles: Blog[] }[] {
  const seriesMap = new Map<string, Blog[]>();
  items
    .filter((a) => a.type === "series" && a.seriesTitle)
    .sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0))
    .forEach((a) => {
      const existing = seriesMap.get(a.seriesTitle!) ?? [];
      existing.push(a);
      seriesMap.set(a.seriesTitle!, existing);
    });
  return Array.from(seriesMap.entries()).map(([title, arts]) => ({ title, articles: arts }));
}
