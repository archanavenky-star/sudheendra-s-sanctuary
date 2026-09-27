import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { getArticlesByType } from "@/data/content";
import bodhi from "@/assets/bodhi-leaf.png.asset.json";

const Articles = () => {
  const items = getArticlesByType("article");

  return (
    <SiteLayout>
      <div className="fade-in">
        <div className="py-8 text-center">
          <img src={bodhi.url} alt="" className="h-12 w-auto mx-auto mb-4 opacity-80" />
          <h2 className="font-heading text-2xl font-medium text-primary mb-2">Articles</h2>
          <p className="text-sm text-muted-foreground font-body">Standalone reflections and explorations.</p>
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

export default Articles;
