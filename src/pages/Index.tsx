import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { articles } from "@/data/content";

const Index = () => {
  const recent = articles.slice(0, 3);

  return (
    <SiteLayout>
      <div className="fade-in">
        <div className="py-12 md:py-20">
          <p className="text-lg md:text-xl font-body leading-relaxed text-foreground/80">
            A quiet space for reflection. 
            <br className="hidden md:block" />
            Words written to be sat with, not skimmed.
          </p>
        </div>

        <div className="space-y-2 fade-in-delay">
          <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Recent Writings
          </h2>
          <div className="space-y-8">
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

        <div className="mt-16 pt-8 border-t border-border fade-in-delay-2">
          <div className="flex gap-8">
            <Link
              to="/articles"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
            >
              All Articles →
            </Link>
            <Link
              to="/notes"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
            >
              Short Notes →
            </Link>
            <Link
              to="/series"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
            >
              Series →
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Index;
