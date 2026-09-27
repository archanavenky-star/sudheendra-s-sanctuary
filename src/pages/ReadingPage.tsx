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
    <SiteLayout>
      <article className="fade-in relative">
        <img
          src={bodhi}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-4 right-0 w-40 opacity-[0.06]"
        />
        <header className="py-8 md:py-12">
          <span className="text-xs text-muted-foreground font-body">
            {article.date}
            {article.type === "series" && article.seriesPart && (
              <span> · Part {article.seriesPart} of {article.seriesTotalParts}</span>
            )}
          </span>
          <h1 className="font-heading text-2xl md:text-3xl font-medium mt-2 text-primary leading-snug">
            {article.title}
          </h1>
          {article.type === "series" && article.seriesTitle && (
            <p className="text-sm text-muted-foreground mt-2 font-body">
              From the series: <em>{article.seriesTitle}</em>
            </p>
          )}
        </header>

        <div className="prose-reading">
          {renderBody(article.body)}
        </div>

        {article.type === "series" && (seriesNav.prev || seriesNav.next) && (
          <nav className="mt-16 pt-8 border-t border-border flex justify-between">
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

        <div className="mt-12 pt-8 border-t border-border">
          <Link to="/" className="text-sm font-body text-muted-foreground hover:text-primary transition-colors">
            ← Back to all writings
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
};

export default ReadingPage;
