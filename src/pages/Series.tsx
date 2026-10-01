import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { getSeriesGroups } from "@/data/content";
import lotus from "@/assets/lotus.png";
import PageMeta from "@/components/PageMeta";
import { useSeriesProgress } from "@/hooks/use-series-progress";

const Series = () => {
  const groups = getSeriesGroups();
  const { progress } = useSeriesProgress();

  return (
    <SiteLayout wide>
      <PageMeta title="Series" description="Ideas given the room to deepen, one part at a time." />
      <div className="fade-in mx-auto max-w-[1440px] px-6 pt-14 md:px-12 md:pt-24 xl:px-20">
        <header className="grid border-b border-border pb-14 md:grid-cols-12 md:pb-20">
          <div className="md:col-span-2"><img src={lotus} alt="" className="h-20 w-auto opacity-80 md:h-28" /></div>
          <div className="mt-8 md:col-span-7 md:col-start-4 md:mt-0">
             <p className="mb-5 text-xs uppercase tracking-[0.28em] text-muted-foreground">An unfolding enquiry</p>
             <h1 className="font-heading text-5xl leading-none text-primary md:text-7xl">Series</h1>
            <p className="mt-7 max-w-xl font-heading text-xl italic leading-relaxed text-foreground/70 md:text-2xl">Ideas given the room to deepen, one part at a time.</p>
          </div>
        </header>
        <div className="divide-y divide-border">
          {groups.length === 0 && <p className="py-20 font-heading text-2xl italic text-muted-foreground">New series will appear here in time.</p>}
          {groups.map((group) => {
            const completed = progress[group.title] ?? 0;
            const target = group.articles.find((part) => (part.seriesPart ?? 0) > completed) ?? group.articles[group.articles.length - 1];
            return (
            <section key={group.title} className="grid py-12 md:grid-cols-12 md:py-20">
              <div className="md:col-span-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{group.articles.length} parts</p>
                <h2 className="mt-3 max-w-xs font-heading text-3xl leading-tight text-primary md:text-4xl">{group.title}</h2>
                {target && <Link to={`/read/${target.slug}`} className="mt-6 inline-block border-b border-primary/50 pb-1 text-xs uppercase tracking-[0.16em] text-primary">{completed > 0 ? `Continue with Part ${target.seriesPart}` : `Begin with Part ${target.seriesPart}`} →</Link>}
              </div>
              <div className="mt-10 divide-y divide-border md:col-span-7 md:col-start-6 md:mt-0">
                {group.articles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/read/${article.slug}`}
                    className="group grid grid-cols-[52px_1fr] py-6 first:pt-0"
                  >
                    <span className="font-heading text-2xl italic text-primary/50">{String(article.seriesPart).padStart(2, "0")}</span>
                    <div><span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{article.date}{(article.seriesPart ?? 0) <= completed ? " · Finished" : ""}</span><h3 className="mt-2 font-heading text-2xl leading-snug text-primary transition-colors duration-500 group-hover:text-foreground">{article.title}</h3></div>
                  </Link>
                ))}
              </div>
            </section>
          );})}
        </div>
      </div>
    </SiteLayout>
  );
};

export default Series;
