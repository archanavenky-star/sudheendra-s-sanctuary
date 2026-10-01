import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import InsightsEmblem from "@/components/InsightsEmblem";
import { getArticlesByType, getSeriesGroups } from "@/data/content";
import PageMeta from "@/components/PageMeta";
import { newestFirst } from "@/lib/reading";
import { useSeriesProgress } from "@/hooks/use-series-progress";
import banner from "@/assets/alternative-home-banner.jpg";
import bodhi from "@/assets/bodhi-leaf.png";
import lotus from "@/assets/lotus.png";

const Home = () => {
  const articleEntries = newestFirst(getArticlesByType("article")).slice(0, 3);
  const feature = articleEntries[0];
  const insight = getArticlesByType("note")[0];
  const seriesGroups = getSeriesGroups();
  const { progress } = useSeriesProgress();

  return (
    <SiteLayout wide>
      <PageMeta />
      <div className="fade-in overflow-hidden">
        <header className="relative mx-auto mt-8 min-h-[420px] w-[calc(100%-2rem)] max-w-[1440px] overflow-hidden md:mt-12 md:aspect-[32/13] md:min-h-0 md:w-[calc(100%-6rem)]">
          <img
            src={banner}
            alt="Dawn opening across a Himalayan valley"
            width={1920}
            height={900}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/65 via-foreground/20 to-transparent" />
          <div className="relative flex min-h-[420px] max-w-[760px] flex-col justify-end px-7 pb-12 pt-10 text-primary-foreground md:h-full md:min-h-0 md:px-16 md:pb-12 md:pt-12">
            <h1 className="font-heading text-5xl font-normal leading-[1.06] md:text-7xl">
              To look closely.<br />To remain still.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-8 text-primary-foreground/85">
              Essays, insights, and unfolding enquiries into awareness and the life that moves through us.
            </p>
            {feature && <Link to={`/read/${feature.slug}`} className="mt-8 w-fit bg-background/90 px-4 py-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-background hover:text-foreground">Begin with the latest →</Link>}
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-24 md:px-12 md:pt-36 xl:px-20">
          <div className="grid gap-y-28 md:grid-cols-12 md:gap-x-10 md:gap-y-40">
            {articleEntries.length > 0 && <section className="md:col-span-8">
              <div className="grid gap-10 border-t border-border pt-10 md:grid-cols-[180px_1fr] md:gap-14">
                <Link to="/articles" className="group w-32 self-start text-center md:w-40" aria-label="Browse all articles">
                  <img src={bodhi} alt="" className="mx-auto h-auto w-[100px] opacity-75 transition-opacity duration-700 group-hover:opacity-100 md:w-[128px]" />
                  <p className="mt-6 text-xs uppercase tracking-[0.28em] text-primary">Articles</p>
                </Link>
                <div>
                  {articleEntries.map((article, index) => (
                    <Link
                      key={article.slug}
                      to={`/read/${article.slug}`}
                      className={`group block ${index > 0 ? "mt-12 border-t border-border pt-9" : ""}`}
                    >
                      <h2 className={`max-w-3xl font-heading font-normal leading-tight transition-colors duration-500 group-hover:text-primary ${index === 0 ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>
                        {article.title}
                      </h2>
                      <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{article.excerpt}</p>
                       <span className="mt-6 inline-block border-b border-primary/60 pb-1 text-xs uppercase tracking-[0.22em] text-primary transition-colors group-hover:text-foreground">Read the article</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>}

            {insight && <section className="md:col-span-4 md:col-start-9 md:pt-40">
              <Link to="/notes" className="group block border border-border bg-card/60 p-8 md:p-10">
                <div className="flex items-start justify-between">
                   <p className="text-xs uppercase tracking-[0.28em] text-primary">Insight</p>
                  <InsightsEmblem className="h-28 w-28 text-primary/65 transition-transform duration-700 group-hover:rotate-12 md:h-32 md:w-32" />
                </div>
                <blockquote className="mt-12 font-heading text-2xl italic leading-relaxed text-foreground md:text-3xl">
                  “{insight.excerpt}”
                </blockquote>
                 <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">{insight.date}</p>
              </Link>
            </section>}

            {seriesGroups.length > 0 && <section className="md:col-span-9 md:col-start-3">
              <div className="grid overflow-hidden border border-primary bg-primary text-primary-foreground md:grid-cols-[0.8fr_1.2fr]">
                <Link to="/series" className="group flex min-h-[330px] flex-col items-center justify-center border-b border-primary-foreground/25 p-10 hover:filter-none md:min-h-[470px] md:border-b-0 md:border-r">
                  <p className="mb-10 text-xs uppercase tracking-[0.28em] text-primary-foreground/80">Series</p>
                  <img src={lotus} alt="" className="h-auto w-[190px] brightness-0 invert md:w-[230px]" />
                </Link>
                <div className="flex flex-col justify-center p-9 md:p-14">
                  <h2 className="font-heading text-4xl font-normal leading-tight md:text-5xl">Explore the series</h2>
                   <p className="mt-6 max-w-lg text-sm leading-7 text-primary-foreground/75">
                    One question given the room to deepen, with each part returning from a different point of view.
                  </p>
                  <div className="mt-10 border-t border-primary-foreground/25">
                     {seriesGroups.map((series) => {
                       const completed = progress[series.title] ?? 0;
                       const target = series.articles.find((part) => (part.seriesPart ?? 0) > completed) ?? series.articles[series.articles.length - 1];
                       const allFinished = completed >= series.articles.length;
                       return target ? <Link key={series.title} to={`/read/${target.slug}`} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-4 border-b border-primary-foreground/25 py-5 text-primary-foreground transition-opacity duration-500 hover:opacity-75">
                        <span className="font-heading text-xl">{series.title}</span>
                          <span className="text-xs uppercase tracking-[0.18em] text-primary-foreground/70">{allFinished ? "Read again" : completed > 0 ? `Continue with Part ${target.seriesPart}` : `Begin with Part ${target.seriesPart}`}</span>
                        <span aria-hidden="true">→</span>
                       </Link> : null;
                     })}
                  </div>
                </div>
              </div>
            </section>}
          </div>

        </div>
      </div>
    </SiteLayout>
  );
};

export default Home;