import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ReaderWatermark from "@/components/ReaderWatermark";
import BlogBody from "@/components/BlogBody";
import LoadingState from "@/components/LoadingState";
import { usePublishedBlog, usePublishedBlogs } from "@/hooks/use-blogs";

const ReadingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blog: article, loading, error } = usePublishedBlog(slug);
  const { blogs } = usePublishedBlogs();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [slug]);

  if (loading) return <LoadingState />;
  if (error) return <div className="py-20 text-center text-sm text-destructive">{error}</div>;
  if (!article) return <SiteLayout><div className="py-20 text-center"><p className="text-muted-foreground font-body">This writing could not be found.</p><Link to="/" className="text-sm text-primary mt-4 inline-block font-body">Return home →</Link></div></SiteLayout>;

  const seriesArticles = article.type === "series" && article.seriesTitle ? blogs.filter((item) => item.type === "series" && item.seriesTitle === article.seriesTitle).sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0)) : [];
  const idx = seriesArticles.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? seriesArticles[idx - 1] : undefined;
  const next = idx >= 0 && idx < seriesArticles.length - 1 ? seriesArticles[idx + 1] : undefined;

  return <SiteLayout wide><ReaderWatermark type={article.type} /><article className="fade-in relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20"><header className="grid border-b border-border py-14 md:grid-cols-12 md:py-24"><div className="md:col-span-2"><span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-body">{article.date}{article.type === "series" && article.seriesPart && <span> · Part {article.seriesPart} of {article.seriesTotalParts}</span>}</span></div><div className="mt-7 md:col-span-8 md:col-start-4 md:mt-0">{article.cover_image_url && <img src={article.cover_image_url} alt="" className="mb-10 max-h-[520px] w-full object-cover" />}{article.type !== "note" ? <h1 className="max-w-4xl font-heading text-4xl font-medium leading-[1.12] text-primary md:text-6xl lg:text-7xl">{article.title}</h1> : <p className="max-w-3xl font-heading text-3xl italic leading-relaxed text-primary md:text-5xl">An insight for quiet contemplation</p>}{article.type === "series" && article.seriesTitle && <p className="text-sm text-muted-foreground mt-2 font-body">From the series: <em>{article.seriesTitle}</em></p>}</div></header><div className="grid py-12 md:grid-cols-12 md:py-20"><aside className="hidden md:col-span-2 md:block">{seriesArticles.length > 0 ? <nav aria-label="Parts in this series" className="sticky top-48 border-t border-primary/30 pt-4"><p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">In this series</p><ol className="space-y-4">{seriesArticles.map((part) => <li key={part.slug} className="border-b border-border/70 pb-4">{part.slug === article.slug ? <span aria-current="page" className="block border-l-2 border-primary pl-3 text-primary"><span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Part {part.seriesPart}</span><span className="mt-1 block font-heading text-sm leading-snug">{part.title}</span></span> : <Link to={`/read/${part.slug}`} className="block pl-3 text-muted-foreground transition-colors hover:text-primary"><span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Part {part.seriesPart}</span><span className="mt-1 block font-heading text-sm leading-snug">{part.title}</span></Link>}</li>)}</ol></nav> : <div className="sticky top-48 border-t border-primary/30 pt-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Read slowly<br />Return often</div>}</aside><div className="prose-reading md:col-span-7 md:col-start-4"><BlogBody body={article.body} /></div></div>{article.type === "series" && (prev || next) && <nav className="mx-auto mt-8 flex max-w-[820px] justify-between border-t border-border pt-8">{prev ? <Link to={`/read/${prev.slug}`} className="font-body text-sm text-action transition-colors hover:text-primary">← Part {prev.seriesPart}</Link> : <span />}{next ? <Link to={`/read/${next.slug}`} className="font-body text-sm text-action transition-colors hover:text-primary">Part {next.seriesPart} →</Link> : <span />}</nav>}<div className="mx-auto mt-12 max-w-[820px] border-t border-border pt-8"><Link to="/" className="font-body text-sm text-action transition-colors hover:text-primary">← Back to all writings</Link></div></article></SiteLayout>;
};
export default ReadingPage;
