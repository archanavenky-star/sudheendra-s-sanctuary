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
  const featured = recent[0];

  if (!featured) return null;

  return (
    <SiteLayout wide>
      <div className="fade-in overflow-hidden">
        <div className="relative mx-auto mt-8 w-[calc(100%-2rem)] max-w-[1440px] overflow-hidden md:mt-12 md:w-[calc(100%-6rem)]">
          <img
            src={banner}
            alt="Sunrise over the mountains"
            className="h-[300px] w-full object-cover md:h-[560px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
        </div>

        <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
          <div className="relative grid py-16 md:grid-cols-12 md:py-28">
            <span aria-hidden="true" className="absolute left-[15%] top-3 font-heading text-[12rem] leading-none text-primary/5">I</span>
            <p className="relative font-heading text-3xl italic leading-relaxed text-foreground/80 md:col-span-6 md:col-start-4 md:text-5xl md:leading-[1.35]">
              A quiet space for reflection.
              <br /> Words written to be sat with, not skimmed.
            </p>
          </div>

          <div className="grid border-y border-border md:grid-cols-12 fade-in-delay">
            {streams.map((stream, index) => (
              <Link
                key={stream.to}
                to={stream.to}
                className={`group relative border-b border-border px-6 py-12 text-left transition-colors duration-500 last:border-b-0 md:min-h-[330px] md:border-b-0 ${index === 0 ? "md:col-span-5 md:pr-20" : index === 1 ? "md:col-span-3 md:border-x md:px-10 md:pt-24" : "md:col-span-4 md:pl-16 md:pt-16"}`}
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
                <h3 className="font-heading text-3xl font-normal text-primary md:text-4xl">
                  {stream.label}
                </h3>
                <p className="mt-5 max-w-[250px] text-sm leading-7 text-muted-foreground font-body">
                  {stream.description}
                </p>
              </Link>
            ))}
          </div>

          <section className="mt-24 border-t border-border pt-12 md:mt-36 md:grid md:grid-cols-12 md:pt-16 fade-in-delay-2">
            <div className="md:col-span-3"><h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Recent Writings</h2></div>
            <div className="mt-10 md:col-span-8 md:col-start-5 md:mt-0">
              <Link to={`/read/${featured.slug}`} className="group block border-b border-border pb-14">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Featured · {featured.date}</p>
                <h3 className="mt-5 max-w-3xl font-heading text-4xl leading-tight transition-colors duration-500 group-hover:text-primary md:text-6xl">{featured.title}</h3>
                <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">{featured.excerpt}</p>
              </Link>
              {recent.slice(1).map((article, index) => (
                <Link
                  key={article.slug}
                  to={`/read/${article.slug}`}
                  className="group grid border-b border-border py-9 md:grid-cols-[70px_1fr]"
                >
                  <span className="font-heading text-2xl italic text-primary/25">0{index + 2}</span><article>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-body">
                      {article.date}
                      {article.type === "series" && (
                        <span className="ml-2">· Series</span>
                      )}
                      {article.type === "note" && (
                        <span className="ml-2">· Insight</span>
                      )}
                    </span>
                    <h3 className="mt-2 font-heading text-2xl font-normal transition-colors duration-500 group-hover:text-primary md:text-3xl">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed font-body">
                      {article.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-24 grid gap-10 border-t border-border pt-14 md:mt-36 md:grid-cols-12 md:pt-20">
            <img
              src={authorBio}
              alt="Sudheendra Chaitanya"
              className="h-auto w-full max-w-[260px] object-cover md:col-span-3"
            />
            <div className="md:col-span-6 md:col-start-5">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">The author</p>
              <h2 className="font-heading text-4xl font-medium text-primary md:text-5xl">
                Sudheendra Chaitanya
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground font-body">
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
