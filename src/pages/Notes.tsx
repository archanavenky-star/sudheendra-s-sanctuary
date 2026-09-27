import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { getArticlesByType } from "@/data/content";
import InsightsEmblem from "@/components/InsightsEmblem";

const Notes = () => {
  const items = getArticlesByType("note");

  return (
    <SiteLayout>
      <div className="fade-in">
        <div className="py-8 text-center">
          <InsightsEmblem className="mx-auto mb-4 h-14 w-14 text-primary/70" />
          <h2 className="font-heading text-2xl font-medium text-primary mb-2">Insights</h2>
          <p className="text-sm text-muted-foreground font-body">Distilled thoughts for quiet contemplation.</p>
        </div>
        <div className="space-y-10">
          {items.map((article) => (
            <Link
              key={article.slug}
              to={`/read/${article.slug}`}
              className="block group"
            >
              <article>
                <span className="text-xs text-muted-foreground font-body">{article.date}</span>
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
    </SiteLayout>
  );
};

export default Notes;
