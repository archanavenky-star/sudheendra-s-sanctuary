import bodhi from "@/assets/bodhi-leaf.png";
import lotus from "@/assets/lotus.png";
import InsightsEmblem from "@/components/InsightsEmblem";

type ReaderWatermarkProps = {
  type: "article" | "note" | "series";
};

const ReaderWatermark = ({ type }: ReaderWatermarkProps) => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed right-0 top-[108px] z-0 h-[calc(100vh-108px)] w-[28vw] min-w-[120px] overflow-hidden md:top-[145px] md:h-[calc(100vh-145px)] md:min-w-[240px]"
  >
    {type === "note" ? (
      <InsightsEmblem className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 text-primary/[0.055] md:h-[92vh] md:w-[92vh]" />
    ) : (
      <img
        src={type === "article" ? bodhi : lotus}
        alt=""
        className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 object-contain opacity-[0.055] md:h-[92vh] md:w-[92vh]"
      />
    )}
  </div>
);

export default ReaderWatermark;