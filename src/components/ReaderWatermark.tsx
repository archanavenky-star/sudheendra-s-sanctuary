import bodhi from "@/assets/bodhi-leaf.png";
import lotus from "@/assets/lotus.png";
import InsightsEmblem from "@/components/InsightsEmblem";

type ReaderWatermarkProps = {
  type: "article" | "note" | "series";
};

const ReaderWatermark = ({ type }: ReaderWatermarkProps) => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed right-0 top-[118px] z-0 hidden h-[calc(100vh-118px)] w-[24vw] min-w-[240px] overflow-hidden md:block"
  >
    {type === "note" ? (
      <InsightsEmblem className="absolute left-1/2 top-1/2 h-[72vh] w-[72vh] -translate-y-1/2 text-primary/[0.055]" />
    ) : (
      <img
        src={type === "article" ? bodhi : lotus}
        alt=""
        className="absolute left-1/2 top-1/2 h-[78vh] w-[78vh] -translate-y-1/2 object-contain opacity-[0.055]"
      />
    )}
  </div>
);

export default ReaderWatermark;