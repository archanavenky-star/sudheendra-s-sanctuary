import { useCallback, useEffect, useState } from "react";
import { getPublishedBlogBySlug, listPublishedBlogs, type Blog } from "@/lib/blog";

export function usePublishedBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setBlogs(await listPublishedBlogs());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load writings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void reload(); }, [reload]);
  return { blogs, loading, error, reload };
}

export function usePublishedBlog(slug: string | undefined) {
  const [blog, setBlog] = useState<Blog | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    if (!slug) {
      setBlog(undefined);
      setLoading(false);
      return;
    }
    void getPublishedBlogBySlug(slug)
      .then((result) => { if (active) setBlog(result); })
      .catch((err) => { if (active) setError(err instanceof Error ? err.message : "Could not load this writing."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  return { blog, loading, error };
}
