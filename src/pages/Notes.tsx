import { useState } from "react";
import { getArticlesByType } from "@/data/content";
import InsightsEmblem from "@/components/InsightsEmblem";
import ReaderWatermark from "@/components/ReaderWatermark";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import parchment from "@/assets/insights-parchment.jpg";

const insightBlocks = getArticlesByType("note")
  .flatMap((insight) => insight.body.split("\n\n"))
  .map((body) => body.trim().replace(/^>\s*/, ""))
  .filter(Boolean)
  .slice(0, 10);

const openingFor = (body: string) => {
  const words = body.split(/\s+/);
  return `${words.slice(0, 17).join(" ")}${words.length > 17 ? "…" : ""}`;
};

const Notes = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedInsight = insightBlocks[selectedIndex] ?? insightBlocks[0] ?? "";

  return (
    <SiteLayout wide>
      <ReaderWatermark type="note" />
      <div className="fade-in relative z-10 mx-auto max-w-[1440px] px-6 pt-12 md:px-12 md:pt-20 xl:px-20">
        <header className="grid border-b border-border pb-12 md:grid-cols-12 md:pb-16">
          <InsightsEmblem className="h-20 w-20 text-primary/75 md:col-span-2 md:h-28 md:w-28" />
          <div className="mt-7 md:col-span-7 md:col-start-4 md:mt-0">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Quiet fragments</p>
            <h1 className="font-heading text-5xl leading-none text-primary md:text-7xl lg:text-8xl">Insights</h1>
            <p className="mt-7 max-w-xl font-heading text-xl italic leading-relaxed text-foreground/70 md:text-2xl">Brief illuminations—small enough to carry, spacious enough to return to.</p>
          </div>
        </header>

        <section className="relative my-10 overflow-hidden border-y border-primary/20 md:my-16">
          <img src={parchment} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-fill opacity-65 mix-blend-multiply" />
          <div className="relative grid min-h-[760px] lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.7fr)]">
            <div className="border-b border-primary/20 px-5 py-7 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
              <p className="mb-6 text-[10px] uppercase tracking-[0.22em] text-primary/70">All insights</p>
              <div className="divide-y divide-primary/15" role="list" aria-label="Insight openings">
                {insightBlocks.map((insight, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div key={`${index}-${insight.slice(0, 24)}`} className="py-4" role="listitem">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setSelectedIndex(index)}
                        aria-pressed={isSelected}
                        className={`h-auto w-full justify-start whitespace-normal rounded-none px-0 py-0 text-left font-body font-normal hover:bg-transparent ${isSelected ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
                      >
                        <span className="grid w-full grid-cols-[28px_1fr] gap-3">
                          <span className="pt-0.5 font-heading text-sm italic text-primary/45">{String(index + 1).padStart(2, "0")}</span>
                          <span>
                            <span className="block text-sm leading-6">{openingFor(insight)}</span>
                            <span className={`mt-1 block text-[10px] uppercase tracking-[0.14em] ${isSelected ? "text-primary" : "text-muted-foreground"}`}>Read more…</span>
                          </span>
                        </span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start px-6 py-10 md:px-12 md:py-16 lg:min-h-[760px] lg:px-16 xl:px-24" aria-live="polite">
              <article key={selectedIndex} className="max-w-[680px] animate-in fade-in-0 duration-300 motion-reduce:animate-none">
                <p className="mb-8 text-[10px] uppercase tracking-[0.2em] text-primary/60">Insight {String(selectedIndex + 1).padStart(2, "0")}</p>
                <p className="font-heading text-2xl leading-[1.75] text-foreground md:text-3xl md:leading-[1.7]">{selectedInsight}</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
};

export default Notes;
