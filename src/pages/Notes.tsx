import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticlesByType } from "@/data/content";
import InsightsEmblem from "@/components/InsightsEmblem";
import ReaderWatermark from "@/components/ReaderWatermark";
import SiteLayout from "@/components/SiteLayout";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import ShareWriting from "@/components/ShareWriting";
import parchment from "@/assets/insights-parchment.jpg";

type InsightBlock = { id: string; body: string };

const insightBlocks: InsightBlock[] = getArticlesByType("note").flatMap((insight) =>
  insight.body.split("\n\n").map((body, paragraphIndex) => ({
    id: `${insight.slug}-${paragraphIndex + 1}`,
    body: body.trim().replace(/^>\s*/, ""),
  })),
).filter((insight) => Boolean(insight.body));

const openingFor = (body: string) => {
  const words = body.split(/\s+/);
  return `${words.slice(0, 17).join(" ")}${words.length > 17 ? "…" : ""}`;
};

const Notes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const readingPanel = useRef<HTMLDivElement>(null);
  const requestedId = searchParams.get("insight");
  const selectedIndex = Math.max(0, insightBlocks.findIndex((insight) => insight.id === requestedId));
  const selectedInsight = insightBlocks[selectedIndex];

  const selectInsight = useCallback((index: number, scroll = false) => {
    const insight = insightBlocks[index];
    if (!insight) return;
    setSearchParams({ insight: insight.id }, { replace: true });
    if (scroll && window.matchMedia("(max-width: 1023px)").matches) {
      window.requestAnimationFrame(() => readingPanel.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [setSearchParams]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && selectedIndex > 0) selectInsight(selectedIndex - 1);
      if (event.key === "ArrowRight" && selectedIndex < insightBlocks.length - 1) selectInsight(selectedIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectInsight, selectedIndex]);

  const title = useMemo(() => selectedInsight ? `Insight ${selectedIndex + 1} of ${insightBlocks.length}` : "Insights", [selectedIndex, selectedInsight]);

  useEffect(() => {
    if (!requestedId && insightBlocks[0]) setSearchParams({ insight: insightBlocks[0].id }, { replace: true });
  }, [requestedId, setSearchParams]);

  return (
    <SiteLayout wide>
      <PageMeta title={title} description={selectedInsight?.body.slice(0, 155) ?? "Brief illuminations for quiet contemplation."} />
      <ReaderWatermark type="note" />
      <div className="fade-in relative z-10 mx-auto max-w-[1440px] px-6 pt-12 md:px-12 md:pt-20 xl:px-20">
        <header className="grid border-b border-border pb-12 md:grid-cols-12 md:pb-16">
          <InsightsEmblem className="h-20 w-20 text-primary/75 md:col-span-2 md:h-28 md:w-28" />
          <div className="mt-7 md:col-span-7 md:col-start-4 md:mt-0">
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-muted-foreground">Quiet fragments</p>
            <h1 className="font-heading text-5xl leading-none text-primary md:text-7xl">Insights</h1>
            <p className="mt-7 max-w-xl font-heading text-xl italic leading-relaxed text-foreground/70 md:text-2xl">Brief illuminations—small enough to carry, spacious enough to return to.</p>
          </div>
        </header>

        {insightBlocks.length === 0 ? <p className="py-20 font-heading text-2xl italic text-muted-foreground">New insights will appear here in time.</p> : (
          <section className="relative my-10 overflow-hidden border-y border-primary/20 md:my-16">
            <img src={parchment} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-fill opacity-65 mix-blend-multiply" />
            <div className="relative grid min-h-[760px] lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.7fr)]">
              <div className="border-b border-primary/20 px-5 py-7 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
                <div className="mb-6 flex items-baseline justify-between gap-4"><p className="text-xs uppercase tracking-[0.22em] text-primary">All insights</p><p className="text-xs italic text-muted-foreground">Select an opening to read</p></div>
                <ol className="divide-y divide-primary/15" aria-label="Insight openings">
                  {insightBlocks.map((insight, index) => {
                    const isSelected = index === selectedIndex;
                    return <li key={insight.id} className="py-3"><Button type="button" variant="ghost" onClick={() => selectInsight(index, true)} aria-pressed={isSelected} className={`min-h-11 h-auto w-full justify-start whitespace-normal rounded-none px-0 py-1 text-left font-body font-normal hover:bg-transparent ${isSelected ? "text-primary" : "text-foreground/75 hover:text-primary"}`}><span className="grid w-full grid-cols-[32px_1fr] gap-3"><span className="pt-0.5 font-heading text-sm italic text-primary/55">{String(index + 1).padStart(2, "0")}</span><span className="block text-sm leading-6">{openingFor(insight.body)}</span></span></Button></li>;
                  })}
                </ol>
              </div>

              <div ref={readingPanel} className="scroll-mt-28 px-6 py-10 md:px-12 md:py-16 lg:min-h-[760px] lg:px-16 xl:px-24" aria-live="polite">
                <div className="mb-9 flex items-center justify-between border-b border-primary/20 pb-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">{selectedIndex + 1} of {insightBlocks.length}</p>
                  <div className="flex gap-2"><ShareWriting title={title} url={`/notes?insight=${selectedInsight?.id ?? ""}`} /><Button variant="ghost" size="icon" className="min-h-11 min-w-11 rounded-none text-primary" disabled={selectedIndex === 0} onClick={() => selectInsight(selectedIndex - 1)} aria-label="Previous insight"><ArrowLeft className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="min-h-11 min-w-11 rounded-none text-primary" disabled={selectedIndex === insightBlocks.length - 1} onClick={() => selectInsight(selectedIndex + 1)} aria-label="Next insight"><ArrowRight className="h-4 w-4" /></Button></div>
                </div>
                <article key={selectedIndex} className="max-w-[680px] animate-in fade-in-0 duration-300 motion-reduce:animate-none"><p className="font-heading text-2xl leading-[1.65] text-foreground md:text-3xl md:leading-[1.6]">{selectedInsight?.body}</p></article>
              </div>
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
};

export default Notes;