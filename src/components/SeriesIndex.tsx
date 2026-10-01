import { Link } from "react-router-dom";
import type { Article } from "@/data/content";

const SeriesIndex = ({ parts, currentSlug, completedPart = 0 }: { parts: Article[]; currentSlug: string; completedPart?: number }) => (
  <ol className="space-y-4">
    {parts.map((part) => {
      const current = part.slug === currentSlug;
      const finished = (part.seriesPart ?? 0) <= completedPart;
      const label = <><span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">Part {part.seriesPart}{finished ? " · Finished" : ""}</span><span className="mt-1 block font-heading text-sm leading-snug">{part.title}</span></>;
      return <li key={part.slug} className="border-b border-border/70 pb-4">{current ? <span aria-current="page" className="block border-l-2 border-primary pl-3 text-primary">{label}</span> : <Link to={`/read/${part.slug}`} className="block min-h-11 pl-3 text-primary transition-colors hover:text-foreground">{label}</Link>}</li>;
    })}
  </ol>
);

export default SeriesIndex;
