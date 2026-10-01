import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import ReaderWatermark from "@/components/ReaderWatermark";
import ReadingProgress from "@/components/ReadingProgress";
import SeriesIndex from "@/components/SeriesIndex";
import PageMeta from "@/components/PageMeta";
import ShareWriting from "@/components/ShareWriting";
import { getArticleBySlug, getArticlesByType, articles } from "@/data/content";
import { newestFirst } from "@/lib/reading";
import { useSeriesProgress } from "@/hooks/use-series-progress";

const ReadingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? "");
  const { progress, markFinished } = useSeriesProgress();

  const seriesArticles = useMemo(() => article?.type === "series" && article.seriesTitle
    ? articles.filter((item) => item.seriesTitle === article.seriesTitle).sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0))
    : [], [article]);

  useEffect(() => {
    if (!article || article.type !== "series" || !article.seriesTitle || !article.seriesPart) return;
    const completeAtEnd = () => {
      const nearEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 240;
      if (nearEnd) markFinished(article.seriesTitle ?? "", article.seriesPart ?? 0);
    };
    window.addEventListener("scroll", completeAtEnd, { passive: true });
    completeAtEnd();
    return () => window.removeEventListener("scroll", completeAtEnd);
  }, [article, markFinished]);

  if (!article) {
    return <SiteLayout><PageMeta title="Writing not found" /><div className="py-20 text-center"><p className="font-heading text-2xl text-muted-foreground">This writing could not be found.</p><Link to="/" className="mt-6 inline-block min-h-11 py-3 text-sm text-primary">Return home →</Link></div></SiteLayout>;
  }

  const currentSeriesIndex = seriesArticles.findIndex((item) => item.slug === article.slug);
  const seriesPrev = currentSeriesIndex > 0 ? seriesArticles[currentSeriesIndex - 1] : undefined;
  const seriesNext = currentSeriesIndex >= 0 && currentSeriesIndex < seriesArticles.length - 1 ? seriesArticles[currentSeriesIndex + 1] : undefined;
  const sameType = newestFirst(getArticlesByType(article.type));
  const typeIndex = sameType.findIndex((item) => item.slug === article.slug);
  const nextSameType = sameType[typeIndex + 1] ?? sameType[0];
  const back = article.type === "article" ? { to: "/articles", label: "Articles" } : article.type === "series" ? { to: "/series", label: "Series" } : { to: "/notes", label: "Insights" };
  const forward = article.type === "series" ? seriesNext : nextSameType?.slug !== article.slug ? nextSameType : undefined;

  const renderBody = (body: string) => body.split("\n\n").map((block, index) => {
    const trimmed = block.trim();
    const isVerse = trimmed.includes("\n") || trimmed.startsWith("ॐ ");
    if (isVerse) return <p key={index} className="prose-invocation">{trimmed.split("\n").map((line, lineIndex) => <span key={`${index}-${lineIndex}`} className="block">{line}</span>)}</p>;
    if (trimmed.startsWith("## ")) return <h2 key={index}>{trimmed.slice(3)}</h2>;
    if (trimmed.startsWith("### ")) return <h3 key={index}>{trimmed.slice(4)}</h3>;
    if (trimmed.startsWith("> ")) return <blockquote key={index}><p>{trimmed.slice(2).replace(/^"/, "“").replace(/"$/, "”")}</p></blockquote>;
    return <p key={index}>{trimmed}</p>;
  });

  return (
    <SiteLayout wide>
      <PageMeta title={article.title} description={article.excerpt} />
      <ReadingProgress />
      <ReaderWatermark type={article.type} />
      <article className="reading-enter relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        <header className="grid border-b border-border py-6 md:grid-cols-12 md:py-8">
          <div className="relative md:col-span-8 md:col-start-4">
            <ShareWriting title={article.title} className="absolute right-0 top-0" />
            {article.type !== "note" ? <h1 className="max-w-4xl pr-14 font-heading text-4xl font-medium leading-[1.12] text-primary md:text-5xl lg:text-6xl">{article.title}</h1> : <h1 className="max-w-3xl pr-14 font-heading text-3xl italic leading-relaxed text-primary md:text-4xl">An insight for quiet contemplation</h1>}
            {article.type === "series" && article.seriesPart && <p className="mt-5 font-heading text-lg text-foreground">Part {article.seriesPart} of {article.seriesTotalParts}</p>}
          </div>
        </header>

        {seriesArticles.length > 0 && <details className="border-b border-border py-5 md:hidden"><summary className="min-h-11 cursor-pointer py-3 text-xs uppercase tracking-[0.18em] text-primary">In this series</summary><div className="pt-4"><SeriesIndex parts={seriesArticles} currentSlug={article.slug} completedPart={progress[article.seriesTitle ?? ""] ?? 0} /></div></details>}

        <div className="grid py-6 md:grid-cols-12 md:py-8">
          <aside className="hidden md:col-span-2 md:block">{seriesArticles.length > 0 ? <nav aria-label="Parts in this series" className="sticky top-32 border-t border-primary/30 pt-4"><p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">In this series</p><SeriesIndex parts={seriesArticles} currentSlug={article.slug} completedPart={progress[article.seriesTitle ?? ""] ?? 0} /></nav> : <div className="sticky top-32 border-t border-primary/30 pt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">Read slowly<br />Return often</div>}</aside>
          <div className="prose-reading md:col-span-7 md:col-start-4 md:mx-0">{renderBody(article.body)}</div>
        </div>

        <div className="mx-auto max-w-[820px] border-t border-border pt-10 text-center"><span aria-hidden="true" className="font-heading text-2xl text-primary">❦</span>{forward ? <Link to={`/read/${forward.slug}`} className="mx-auto mt-5 block min-h-11 max-w-lg py-3 font-heading text-xl text-primary transition-colors hover:text-foreground">{article.type === "series" ? `Continue to Part ${forward.seriesPart}` : article.type === "article" ? "Read the next article" : "Read the next insight"} →</Link> : <Link to={back.to} className="mx-auto mt-5 block min-h-11 py-3 font-heading text-xl text-primary">Return to {back.label}</Link>}</div>
        {article.type === "series" && seriesPrev && <div className="mx-auto mt-5 max-w-[820px] text-center"><Link to={`/read/${seriesPrev.slug}`} className="inline-block min-h-11 py-3 text-sm text-muted-foreground transition-colors hover:text-primary">← Previous · Part {seriesPrev.seriesPart}</Link></div>}
        <div className="mx-auto mb-2 mt-5 max-w-[820px] text-center"><Link to={back.to} className="inline-block min-h-11 py-3 text-sm text-primary">← Back to {back.label}</Link></div>
      </article>
    </SiteLayout>
  );
};

export default ReadingPage;