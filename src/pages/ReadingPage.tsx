import { useParams, Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { getArticleBySlug, articles } from "@/data/content";
import bodhi from "@/assets/bodhi-leaf.png";

const ReadingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? "");

  if (!article) {
    return (
      <SiteLayout>
        <div className="py-20 text-center">
          <p className="text-muted-foreground font-body">This writing could not be found.</p>
          <Link to="/" className="text-sm text-primary mt-4 inline-block font-body">
            Return home →
          </Link>
        </div>
      </SiteLayout>
    );
  }

  // Find next/prev in series
  let seriesNav: { prev?: typeof article; next?: typeof article } = {};
  if (article.type === "series" && article.seriesTitle) {
    const seriesArticles = articles
      .filter((a) => a.seriesTitle === article.seriesTitle)
      .sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0));
    const idx = seriesArticles.findIndex((a) => a.slug === article.slug);
    if (idx > 0) seriesNav.prev = seriesArticles[idx - 1];
    if (idx < seriesArticles.length - 1) seriesNav.next = seriesArticles[idx + 1];
  }

  // Convert body to HTML-like paragraphs
  const renderBody = (body: string) => {
    return body.split("\n\n").map((block, i) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return <h2 key={i}>{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith("### ")) {
        return <h3 key={i}>{trimmed.slice(4)}</h3>;
      }
      if (trimmed.startsWith("> ")) {
        return <blockquote key={i}><p>{trimmed.slice(2).replace(/^"/, "\u201c").replace(/"$/, "\u201d")}</p></blockquote>;
      }
      return <p key={i}>{trimmed}</p>;
    });
  };

  return (
    <SiteLayout wide>
      <article className="fade-in relative mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        <img
          src={bodhi}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-10 w-48 select-none opacity-[0.055] md:right-20 md:w-72"
        />
        <header className="grid border-b border-border py-14 md:grid-cols-12 md:py-24">
          <div className="md:col-span-2"><span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-body">
            {article.date}
            {article.type === "series" && article.seriesPart && (
              <span> · Part {article.seriesPart} of {article.seriesTotalParts}</span>
            )}
          </span></div>
          <div className="mt-7 md:col-span-8 md:col-start-4 md:mt-0"><h1 className="max-w-4xl font-heading text-4xl font-medium leading-[1.12] text-primary md:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          {article.type === "series" && article.seriesTitle && (
            <p className="text-sm text-muted-foreground mt-2 font-body">
              From the series: <em>{article.seriesTitle}</em>
            </p>
          )}</div>
        </header>

        <div className="grid py-12 md:grid-cols-12 md:py-20">
          <aside className="hidden md:col-span-2 md:block"><div className="sticky top-10 border-t border-primary/30 pt-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Read slowly<br />Return often</div></aside>
          <div className="prose-reading md:col-span-7 md:col-start-4 md:mx-0">
            {renderBody(article.body)}
          </div>
        </div>

        {article.type === "series" && (seriesNav.prev || seriesNav.next) && (
          <nav className="mx-auto mt-8 flex max-w-[820px] justify-between border-t border-border pt-8">
            {seriesNav.prev ? (
              <Link to={`/read/${seriesNav.prev.slug}`} className="text-sm font-body text-muted-foreground hover:text-primary transition-colors">
                ← Part {seriesNav.prev.seriesPart}
              </Link>
            ) : <span />}
            {seriesNav.next ? (
              <Link to={`/read/${seriesNav.next.slug}`} className="text-sm font-body text-muted-foreground hover:text-primary transition-colors">
                Part {seriesNav.next.seriesPart} →
              </Link>
            ) : <span />}
          </nav>
        )}

        <div className="mx-auto mt-12 max-w-[820px] border-t border-border pt-8">
          <Link to="/" className="text-sm font-body text-muted-foreground hover:text-primary transition-colors">
            ← Back to all writings
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
};

export default ReadingPage;
