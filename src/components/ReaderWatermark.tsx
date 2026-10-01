import InsightsEmblem from "@/components/InsightsEmblem";
import { BodhiLeafEmblem, LotusEmblem } from "@/components/CategoryEmblems";

type ReaderWatermarkProps = {
  type: "article" | "note" | "series";
};

const ReaderWatermark = ({ type }: ReaderWatermarkProps) => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed right-0 top-0 z-0 h-screen w-[52vh] overflow-hidden md:w-[69.33vh]"
  >
    {type === "note" ? (
      <InsightsEmblem className="absolute -right-[26vh] top-1/2 h-[78vh] w-[78vh] -translate-y-1/2 text-primary/[0.055] md:-right-[34.67vh] md:h-[104vh] md:w-[104vh]" />
    ) : (
      type === "article"
        ? <BodhiLeafEmblem className="absolute -right-[26vh] top-1/2 h-[78vh] w-[78vh] -translate-y-1/2 text-primary/[0.055] md:-right-[34.67vh] md:h-[104vh] md:w-[104vh]" />
        : <LotusEmblem className="absolute -right-[26vh] top-1/2 h-[78vh] w-[78vh] -translate-y-1/2 text-primary/[0.055] md:-right-[34.67vh] md:h-[104vh] md:w-[104vh]" />
    )}
  </div>
);

export default ReaderWatermark;