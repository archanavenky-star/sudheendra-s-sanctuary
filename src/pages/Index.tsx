import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { articles } from "@/data/content";
import banner from "@/assets/home-banner.jpg";
import authorBio from "@/assets/author-bio.jpg";
import bodhi from "@/assets/bodhi-leaf.png";
import lotus from "@/assets/lotus.png";
import InsightsEmblem from "@/components/InsightsEmblem";

const streams = [
  {
    to: "/articles",
    label: "Articles",
    description: "Standalone enquiries into life and awareness.",
    icon: bodhi,
  },
  {
    to: "/notes",
    label: "Insights",
    description: "A distilled thought for quiet contemplation.",
    icon: "insights",
  },
  {
    to: "/series",
    label: "Series",
    description: "One enquiry unfolding slowly across many parts.",
    icon: lotus,
  },
];

const Index = () => {
  const recent = articles.slice(0, 3);

  return (
    <SiteLayout wide>
      <div className="fade-in overflow-hidden">
        <div className="relative mx-auto mt-8 w-[calc(100%-2rem)] max-w-[1180px] overflow-hidden md:mt-12 md:w-[calc(100%-5rem)]">
          <img
            src={banner}
            alt="Sunrise over the mountains"
            className="h-[260px] w-full object-cover md:h-[440px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
        </div>

        <div className="max-w-[640px] mx-auto px-6">
          <div className="relative py-16 text-left md:py-24">
            <span aria-hidden="true" className="absolute -left-10 top-4 font-heading text-[9rem] leading-none text-primary/5">I</span>
            <p className="relative max-w-[520px] font-heading text-2xl italic leading-relaxed text-foreground/80 md:text-3xl">
              A quiet space for reflection.
              <br /> Words written to be sat with, not skimmed.
            </p>
          </div>

          <div className="grid border-y border-border md:grid-cols-3 fade-in-delay">
            {streams.map((stream) => (
              <Link
                key={stream.to}
                to={stream.to}
                className="group relative px-7 py-10 text-left transition-colors duration-500 md:min-h-[250px] md:border-r md:border-border md:last:border-r-0"
              >
                <span className="absolute right-6 top-6 font-heading text-xs italic text-muted-foreground/60">0{streams.indexOf(stream) + 1}</span>
                <div className="mb-8 flex h-14 items-center text-primary/70">
                  {stream.icon === "insights" ? (
                    <InsightsEmblem className="h-12 w-12 transition-transform duration-700 group-hover:rotate-12" />
                  ) : (
                    <img
                      src={stream.icon as string}
                      alt=""
                      className="h-12 w-auto opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}
                </div>
                <h3 className="font-heading text-2xl font-normal text-primary">
                  {stream.label}
                </h3>
                <p className="mt-3 max-w-[180px] text-sm leading-relaxed text-muted-foreground font-body">
                  {stream.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-24 md:ml-20 fade-in-delay-2">
            <h2 className="mb-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Recent Writings
            </h2>
            <div className="space-y-0 border-t border-border">
              {recent.map((article) => (
                <Link
                  key={article.slug}
                  to={`/read/${article.slug}`}
                  className="group block border-b border-border py-8"
                >
                  <article>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-body">
                      {article.date}
                      {article.type === "series" && (
                        <span className="ml-2">· Series</span>
                      )}
                      {article.type === "note" && (
                        <span className="ml-2">· Insight</span>
                      )}
                    </span>
                    <h3 className="mt-2 font-heading text-2xl font-normal group-hover:text-primary transition-colors duration-500">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed font-body">
                      {article.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-24 flex flex-col items-center gap-8 border-t border-border pt-12 sm:flex-row sm:items-start">
            <img
              src={authorBio}
              alt="Sudheendra Chaitanya"
              className="w-28 h-28 object-cover rounded-sm"
            />
            <div className="text-center sm:text-left">
              <h2 className="font-heading text-lg font-medium text-primary">
                Sudheendra Chaitanya
              </h2>
              <p className="text-sm text-muted-foreground font-body mt-2 leading-relaxed">
                A teacher of Advaita Vedanta, offering these writings as an
                invitation to enquire — quietly, patiently, and for oneself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Index;
