import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { articles } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const WritingSearch = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const normalized = query.trim().toLocaleLowerCase();
  const results = useMemo(() => normalized
    ? articles.filter((item) => `${item.title} ${item.excerpt} ${item.body}`.toLocaleLowerCase().includes(normalized)).slice(0, 6)
    : [], [normalized]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 w-10 rounded-full border-primary/20 bg-transparent px-0 font-body font-normal text-primary shadow-none hover:border-primary/40 hover:bg-primary/5 sm:w-36 sm:justify-start sm:px-4" aria-label="Search writings" title="Search writings">
          <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
          <span className="hidden text-xs text-muted-foreground sm:inline">Search</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(92vw,420px)] rounded-none border-primary/20 bg-background p-0 shadow-xl">
        <div className="flex items-center border-b border-border px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the writings" className="h-12 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" />
          {query && <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => setQuery("")} aria-label="Clear search"><X className="h-4 w-4" /></Button>}
        </div>
        <div className="max-h-[420px] overflow-y-auto p-2">
          {!normalized ? <p className="px-3 py-7 text-center font-heading text-sm italic text-muted-foreground">Enter a word or phrase.</p> : results.length > 0 ? results.map((item) => (
            <Link key={item.slug} to={`/read/${item.slug}`} onClick={() => setOpen(false)} className="block border-b border-border/70 px-3 py-4 last:border-0 hover:bg-muted/60">
              <span className="block font-heading text-lg leading-snug text-primary">{item.type === "note" ? item.excerpt : item.title}</span>
              <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.type === "note" ? "Insight" : item.type}</span>
            </Link>
          )) : <p className="px-3 py-7 text-center font-heading text-sm italic text-muted-foreground">No writing found.</p>}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WritingSearch;