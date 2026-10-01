import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import type { Article } from "@/data/content";
import PageMeta from "@/components/PageMeta";

interface CollectionPageProps {
  title: string;
  description: string;
  items: Article[];
  emblem: React.ReactNode;
}

const CollectionPage = ({ title, description, items, emblem }: CollectionPageProps) => (
  <SiteLayout wide>
    <PageMeta title={title} description={description} />
    <div className="fade-in mx-auto max-w-[1440px] px-6 pt-14 md:px-12 md:pt-24 xl:px-20">
      <header className="grid border-b border-border pb-14 md:grid-cols-12 md:pb-20">
        <div className="flex items-start text-primary/75 md:col-span-2">{emblem}</div>
        <div className="mt-8 md:col-span-7 md:col-start-4 md:mt-0">
          <h1 className="font-heading text-5xl leading-none text-primary md:text-7xl">{title}</h1>
          <p className="mt-7 max-w-xl font-heading text-xl italic leading-relaxed text-foreground/70 md:text-2xl">{description}</p>
        </div>
      </header>

      <div className="divide-y divide-border">
        {items.length === 0 && <p className="py-20 font-heading text-2xl italic text-muted-foreground">New writings will appear here in time.</p>}
        {items.map((article, index) => (
          <Link key={article.slug} to={`/read/${article.slug}`} className="writing-row group grid py-10 md:grid-cols-12 md:py-14">
            <div className="flex items-baseline gap-4 md:col-span-2">
              <span className="font-heading text-3xl italic text-primary/25">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <article className="mt-5 md:col-span-6 md:col-start-4 md:mt-0">
              <h2 className="font-heading text-3xl leading-tight text-foreground transition-colors duration-500 group-hover:text-primary md:text-4xl">{article.title}</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">{article.excerpt}</p>
            </article>
            <div className="mt-6 flex items-end justify-end md:col-span-2 md:col-start-11 md:mt-0">
              <span className="text-2xl text-primary transition-transform duration-500 group-hover:translate-x-2 group-hover:text-foreground" aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </SiteLayout>
);

export default CollectionPage;