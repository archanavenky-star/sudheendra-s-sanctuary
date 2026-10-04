import bodhi from "@/assets/bodhi-leaf.png";
import lotus from "@/assets/lotus.png";
import InsightsEmblem from "@/components/InsightsEmblem";

type ReaderWatermarkProps = {
  type: "article" | "note" | "series";
};

const ReaderWatermark = ({ type }: ReaderWatermarkProps) => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed right-0 top-[108px] z-0 h-[calc(100vh-108px)] w-[52vh] overflow-hidden md:top-[145px] md:h-[calc(100vh-145px)] md:w-[69.33vh]"
  >
    {type === "note" ? (
      <InsightsEmblem className="absolute -right-[26vh] top-1/2 h-[78vh] w-[78vh] -translate-y-1/2 text-primary/[0.055] md:-right-[34.67vh] md:h-[104vh] md:w-[104vh]" />
    ) : (
      <img
        src={type === "article" ? bodhi : lotus}
        alt=""
        className="absolute -right-[26vh] top-1/2 h-[78vh] w-[78vh] -translate-y-1/2 object-contain opacity-[0.055] md:-right-[34.67vh] md:h-[104vh] md:w-[104vh]"
      />
    )}
  </div>
);

export default ReaderWatermark;