import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { getSeriesGroups } from "@/data/content";
import lotus from "@/assets/lotus.png.asset.json";

const Series = () => {
  const groups = getSeriesGroups();

  return (
    <SiteLayout>
      <div className="fade-in">
        <div className="py-8 text-center">
          <img src={lotus.url} alt="" className="h-12 w-auto mx-auto mb-4 opacity-80" />
          <h2 className="font-heading text-2xl font-medium text-primary mb-2">Series</h2>
          <p className="text-sm text-muted-foreground font-body">Multi-part explorations into a single theme.</p>
        </div>
        <div className="space-y-12">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading text-lg font-medium text-foreground mb-4">{group.title}</h3>
              <div className="space-y-4 border-l-2 border-border pl-6">
                {group.articles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/read/${article.slug}`}
                    className="block group"
                  >
                    <span className="text-xs text-muted-foreground font-body">
                      Part {article.seriesPart} of {article.seriesTotalParts} · {article.date}
                    </span>
                    <h4 className="font-heading text-base font-medium mt-0.5 group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
};

export default Series;
