import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Save, Send, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/AdminLayout";
import LoadingState from "@/components/LoadingState";
import BlogBody from "@/components/BlogBody";
import { sanitizeHtml } from "@/lib/sanitize";
import { createBlog, getAdminBlog, updateBlog, type BlogInput, type BlogType, type BlogStatus } from "@/lib/blog";
import { uploadBlogImage } from "@/lib/supabase";

const slugify = (value: string) => value.toLowerCase().trim().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);

const todayIso = () => new Date().toISOString();

const AdminEditor = () => {
  const { id } = useParams<{ id: string }>();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<BlogInput>({ slug: "", title: "", excerpt: "", body: "", type: "article", status: "draft", authorName: "Sudheendra Chaitanya" });

  useEffect(() => {
    if (!id) return;
    void getAdminBlog(id).then((blog) => {
      if (!blog) { setError("Writing not found."); setLoading(false); return; }
      setForm({ slug: blog.slug, title: blog.title, excerpt: blog.excerpt, body: blog.body, type: blog.type, seriesTitle: blog.seriesTitle, seriesPart: blog.seriesPart, seriesTotalParts: blog.seriesTotalParts, coverImageUrl: blog.cover_image_url ?? undefined, authorName: blog.author_name, status: blog.status, publishedAt: blog.published_at });
      setLoading(false);
    }).catch((err) => { setError(err instanceof Error ? err.message : "Could not load this writing."); setLoading(false); });
  }, [id]);

  useEffect(() => {
    if (!editorRef.current || loading) return;
    const body = form.body || "";
    editorRef.current.innerHTML = /<\/?(p|h2|h3|strong|em|u|blockquote|ul|ol|li|a|img|br)(\s|>)/i.test(body) ? sanitizeHtml(body) : markdownToHtml(body);
  }, [loading, id]);

  const set = <K extends keyof BlogInput,>(key: K, value: BlogInput[K]) => setForm((current) => ({ ...current, [key]: value }));

  const insertMarkdown = (prefix: string, suffix = "", placeholder = "text") => {
    const textarea = document.getElementById("body") as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.body.slice(start, end) || placeholder;
    const next = `${form.body.slice(0, start)}${prefix}${selected}${suffix}${form.body.slice(end)}`;
    set("body", next);
    requestAnimationFrame(() => { textarea.focus(); textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length); });
  };

  const save = async (status: BlogStatus) => {
    if (!form.title.trim() || !form.body.trim()) { setError("Title and content are required."); return; }
    const slug = form.slug.trim() || slugify(form.title);
    if (!slug) { setError("Please provide a valid slug."); return; }
    setSaving(true); setError(null);
    try {
      const payload = { ...form, slug, status, publishedAt: status === "published" ? (form.publishedAt || todayIso()) : null };
      const saved = editing && id ? await updateBlog(id, payload) : await createBlog(payload);
      navigate(`/admin/blogs/${saved.id}/edit`, { replace: true });
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save the writing."); }
    finally { setSaving(false); }
  };

  const submit = async (event: FormEvent) => { event.preventDefault(); await save(form.status); };

  const upload = async (file: File) => {
    setUploading(true); setError(null);
    try { set("coverImageUrl", await uploadBlogImage(file)); }
    catch (err) { setError(err instanceof Error ? err.message : "Image upload failed."); }
    finally { setUploading(false); }
  };

  const preview = useMemo(() => form.body, [form.body]);

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    if (editorRef.current) set("body", sanitizeHtml(editorRef.current.innerHTML));
  };

  const insertHtml = (html: string) => {
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, html);
    if (editorRef.current) set("body", sanitizeHtml(editorRef.current.innerHTML));
  };

  const markdownToHtml = (markdown: string) => {
    const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const inline = (value: string) => escape(value).replace(/!\[([^\]]*)\]\(([^\s)]+)\)/g, '<img src="$2" alt="$1" />').replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, '<a href="$2">$1</a>');
    return markdown.split(/\n\s*\n/).map((block) => {
      const b = block.trim();
      if (!b) return "";
      if (b.startsWith("### ")) return `<h3>${inline(b.slice(4))}</h3>`;
      if (b.startsWith("## ")) return `<h2>${inline(b.slice(3))}</h2>`;
      if (b.split("\n").every((line) => line.startsWith("> "))) return `<blockquote><p>${inline(b.split("\n").map((line) => line.slice(2)).join(" "))}</p></blockquote>`;
      if (b.split("\n").every((line) => line.startsWith("- "))) return `<ul>${b.split("\n").map((line) => `<li>${inline(line.slice(2))}</li>`).join("")}</ul>`;
      return `<p>${inline(b).replace(/\n/g, "<br>")}</p>`;
    }).join("");
  };

  if (loading) return <AdminLayout><LoadingState />;</AdminLayout>;

  return <AdminLayout>
    <div className="mb-8 flex items-center gap-4"><Button variant="ghost" size="sm" asChild><Link to="/admin/blogs"><ArrowLeft className="mr-2 h-4 w-4" />All writings</Link></Button><Badge variant={form.status === "published" ? "default" : "secondary"}>{form.status}</Badge></div>
    <form onSubmit={submit}>
      {error && <div className="mb-6 border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-6">
          <div className="border border-border bg-card/30 p-6 md:p-8">
            <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" value={form.title} onChange={(e) => { set("title", e.target.value); if (!editing && !form.slug) set("slug", slugify(e.target.value)); }} placeholder="A title for your writing" className="h-12 text-lg" /></div>
            <div className="mt-6 space-y-2"><Label htmlFor="slug">Slug</Label><Input id="slug" value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} placeholder="my-writing" /><p className="text-xs text-muted-foreground">Public URL: /read/{form.slug || "your-slug"}</p></div>
            <div className="mt-6 space-y-2"><Label htmlFor="excerpt">Excerpt</Label><Textarea id="excerpt" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} placeholder="A short introduction shown in listings." /></div>
          </div>

          <div className="border border-border bg-card/30 p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><Label>Content</Label><p className="mt-1 text-xs text-muted-foreground">Markdown is supported. Use the toolbar for common formatting.</p></div><div className="flex flex-wrap gap-1">
              <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("## ", "", "Heading")}>H2</Button>
              <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("### ", "", "Heading")}>H3</Button>
              <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("> ", "", "Quote")}>Quote</Button>
              <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("[", "](https://example.com)", "Link text")}>Link</Button>
              <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("- ", "", "List item")}>List</Button>
            </div></div>
            <Tabs defaultValue="write"><TabsList><TabsTrigger value="write">Write</TabsTrigger><TabsTrigger value="preview"><Eye className="mr-2 h-4 w-4" />Preview</TabsTrigger></TabsList>
              <TabsContent value="write" className="mt-4">
                <div className="mb-3 flex flex-wrap gap-1 rounded-t-md border border-b-0 border-border bg-muted/30 p-2">
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("bold")}><strong>B</strong></Button>
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("italic")}><em>I</em></Button>
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("underline")}><u>U</u></Button>
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("formatBlock", "h2")}>H2</Button>
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("formatBlock", "h3")}>H3</Button>
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("formatBlock", "blockquote")}>Quote</Button>
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertUnorderedList")}>• List</Button>
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => { const url = window.prompt("Link URL"); if (url) exec("createLink", url); }}>Link</Button>
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("undo")}>Undo</Button>
                  <Button type="button" size="sm" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("redo")}>Redo</Button>
                </div>
                <div id="body" ref={editorRef} contentEditable suppressContentEditableWarning onInput={(e) => set("body", sanitizeHtml(e.currentTarget.innerHTML))} data-placeholder="Begin writing…" className="min-h-[600px] rounded-b-md border border-border bg-background p-5 font-body text-base leading-8 outline-none focus:ring-2 focus:ring-ring [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-5 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:text-primary [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:text-primary [&_img]:my-6 [&_img]:max-h-[500px] [&_img]:w-full [&_img]:object-contain [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6" />
              </TabsContent>
              <TabsContent value="preview" className="mt-4 min-h-[600px] border border-border bg-background p-6 md:p-10"><div className="prose-reading"><BlogBody body={preview || "Nothing to preview yet."} /></div></TabsContent>
            </Tabs>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="border border-border bg-card/30 p-6">
            <div className="flex items-center justify-between"><h2 className="font-heading text-2xl text-primary">Publishing</h2><Badge variant={form.status === "published" ? "default" : "secondary"}>{form.status}</Badge></div>
            <div className="mt-6 space-y-2"><Label>Type</Label><Select value={form.type} onValueChange={(value) => set("type", value as BlogType)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="article">Article</SelectItem><SelectItem value="note">Insight</SelectItem><SelectItem value="series">Series</SelectItem></SelectContent></Select></div>
            <div className="mt-5 space-y-2"><Label htmlFor="author">Author</Label><Input id="author" value={form.authorName ?? ""} onChange={(e) => set("authorName", e.target.value)} /></div>
            {form.type === "series" && <div className="mt-5 grid grid-cols-2 gap-3"><div className="space-y-2"><Label htmlFor="seriesTitle">Series title</Label><Input id="seriesTitle" value={form.seriesTitle ?? ""} onChange={(e) => set("seriesTitle", e.target.value)} /></div><div className="space-y-2"><Label htmlFor="seriesPart">Part</Label><Input id="seriesPart" type="number" min="1" value={form.seriesPart ?? ""} onChange={(e) => set("seriesPart", e.target.value ? Number(e.target.value) : undefined)} /></div><div className="col-span-2 space-y-2"><Label htmlFor="seriesTotalParts">Total parts</Label><Input id="seriesTotalParts" type="number" min="1" value={form.seriesTotalParts ?? ""} onChange={(e) => set("seriesTotalParts", e.target.value ? Number(e.target.value) : undefined)} /></div></div>}
          </div>

          <div className="border border-border bg-card/30 p-6">
            <h2 className="font-heading text-2xl text-primary">Cover image</h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Images are stored in Supabase Storage.</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file); }} />
            {form.coverImageUrl && <img src={form.coverImageUrl} alt="Cover preview" className="mt-5 max-h-64 w-full object-cover" />}
            <Button type="button" variant="outline" className="mt-5 w-full" disabled={uploading} onClick={() => fileRef.current?.click()}><ImagePlus className="mr-2 h-4 w-4" />{uploading ? "Uploading…" : "Upload image"}</Button>
            {form.coverImageUrl && <Button type="button" variant="ghost" className="mt-2 w-full" onClick={() => insertHtml(`<img src="${form.coverImageUrl}" alt="Cover image" />`)}>Insert image into content</Button>}
          </div>

          <div className="sticky top-24 border border-primary/20 bg-primary p-6 text-primary-foreground">
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/65">Ready?</p>
            <Button type="button" variant="secondary" className="mt-5 w-full" disabled={saving} onClick={() => void save("published")}><Send className="mr-2 h-4 w-4" />{saving ? "Saving…" : "Publish"}</Button>
            <Button type="button" variant="ghost" className="mt-2 w-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" disabled={saving} onClick={() => void save("draft")}><Save className="mr-2 h-4 w-4" />Save draft</Button>
          </div>
        </aside>
      </div>
    </form>
  </AdminLayout>;
};

export default AdminEditor;
