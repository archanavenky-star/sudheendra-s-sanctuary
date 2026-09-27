import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { articles } from "@/data/content";
import banner from "@/assets/home-banner.jpg";
import authorBio from "@/assets/author-bio.jpg";
import bodhi from "@/assets/bodhi-leaf.png";
import lotus from "@/assets/lotus.png";

const streams = [
  {
    to: "/articles",
    label: "Articles",
    description: "Standalone reflections, read at their own pace.",
    icon: bodhi,
  },
  {
    to: "/notes",
    label: "Short Notes",
    description: "Brief insights to sit with for a while.",
    icon: null,
  },
  {
    to: "/series",
    label: "Series",
    description: "Longer enquiries unfolding across parts.",
    icon: lotus,
  },
];

const Index = () => {
  const recent = articles.slice(0, 3);

  return (
    <SiteLayout wide>
      <div className="fade-in">
        <div className="relative w-full overflow-hidden">
          <img
            src={banner}
            alt="Sunrise over the mountains"
            className="w-full h-[220px] md:h-[320px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
        </div>

        <div className="max-w-[640px] mx-auto px-6">
          <div className="py-12 md:py-16 text-center">
            <p className="text-lg md:text-xl font-body leading-relaxed text-foreground/80">
              A quiet space for reflection.
              <br className="hidden md:block" /> Words written to be sat with,
              not skimmed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 fade-in-delay">
            {streams.map((stream) => (
              <Link
                key={stream.to}
                to={stream.to}
                className="group border border-border bg-card/60 px-5 py-6 text-center transition-colors duration-300 hover:border-primary/40"
              >
                <div className="h-10 flex items-center justify-center mb-3">
                  {stream.icon ? (
                    <img
                      src={stream.icon}
                      alt=""
                      className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="block h-1.5 w-1.5 rounded-full bg-primary/50" />
                  )}
                </div>
                <h3 className="font-heading text-lg font-medium text-primary">
                  {stream.label}
                </h3>
                <p className="text-xs text-muted-foreground font-body mt-2 leading-relaxed">
                  {stream.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-20 fade-in-delay-2">
            <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Recent Writings
            </h2>
            <div className="space-y-10">
              {recent.map((article) => (
                <Link
                  key={article.slug}
                  to={`/read/${article.slug}`}
                  className="block group"
                >
                  <article>
                    <span className="text-xs text-muted-foreground font-body">
                      {article.date}
                      {article.type === "series" && (
                        <span className="ml-2">· Series</span>
                      )}
                      {article.type === "note" && (
                        <span className="ml-2">· Note</span>
                      )}
                    </span>
                    <h3 className="font-heading text-xl font-medium mt-1 group-hover:text-primary transition-colors duration-200">
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

          <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row gap-6 items-center sm:items-start">
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
