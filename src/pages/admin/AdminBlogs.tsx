import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Edit3, ExternalLink, FileText, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingState from "@/components/LoadingState";
import AdminLayout from "@/components/AdminLayout";
import { deleteBlog, listAdminBlogs, type Blog } from "@/lib/blog";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try { setBlogs(await listAdminBlogs()); setError(null); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load writings."); }
    finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter((blog) => `${blog.title} ${blog.slug} ${blog.type} ${blog.status}`.toLowerCase().includes(q));
  }, [blogs, search]);

  const remove = async (blog: Blog) => {
    if (!blog.id || !window.confirm(`Delete “${blog.title}”? This cannot be undone.`)) return;
    setDeleting(blog.id);
    try { await deleteBlog(blog.id); setBlogs((items) => items.filter((item) => item.id !== blog.id)); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not delete the writing."); }
    finally { setDeleting(null); }
  };

  return <AdminLayout>
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div><p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Content</p><h1 className="mt-2 font-heading text-5xl text-primary">Writings</h1></div>
      <div className="relative w-full md:w-80"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search writings…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
    </div>

    {error && <div className="mt-8 border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}
    {loading ? <LoadingState /> : (
      <div className="mt-8 overflow-hidden border border-border">
        <div className="hidden grid-cols-[1fr_120px_120px_130px] gap-4 border-b border-border bg-muted/30 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:grid">
          <span>Writing</span><span>Type</span><span>Status</span><span className="text-right">Actions</span>
        </div>
        {filtered.length === 0 && <div className="p-10 text-center text-sm text-muted-foreground">No writings found.</div>}
        {filtered.map((blog) => <div key={blog.id} className="grid gap-4 border-b border-border p-5 last:border-b-0 md:grid-cols-[1fr_120px_120px_130px] md:items-center">
          <div className="min-w-0"><div className="flex items-center gap-2"><FileText className="h-4 w-4 shrink-0 text-primary/60" /><h2 className="truncate font-heading text-xl text-primary">{blog.title}</h2></div><p className="mt-1 truncate text-xs text-muted-foreground">/read/{blog.slug}</p></div>
          <span className="text-xs capitalize text-muted-foreground">{blog.type}</span>
          <span><Badge variant={blog.status === "published" ? "default" : "secondary"}>{blog.status}</Badge></span>
          <div className="flex justify-start gap-1 md:justify-end">
            <Button variant="ghost" size="icon" asChild title="Edit"><Link to={`/admin/blogs/${blog.id}/edit`}><Edit3 className="h-4 w-4" /></Link></Button>
            {blog.status === "published" && <Button variant="ghost" size="icon" asChild title="View"><Link to={`/read/${blog.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link></Button>}
            <Button variant="ghost" size="icon" title="Delete" disabled={deleting === blog.id} onClick={() => void remove(blog)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
        </div>)}
      </div>
    )}
  </AdminLayout>;
};

export default AdminBlogs;
