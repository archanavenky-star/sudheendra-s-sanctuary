import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type ShareWritingProps = {
  title: string;
  url?: string;
  className?: string;
};

const ShareWriting = ({ title, url, className }: ShareWritingProps) => {
  const share = async () => {
    const shareUrl = url ? new URL(url, window.location.origin).toString() : window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copied", description: "The writing’s link is ready to share." });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast({ title: "Could not share", description: "Please copy the address from your browser." });
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={share}
      className={`h-11 w-11 rounded-full text-primary hover:bg-primary/10 hover:text-primary ${className ?? ""}`}
      aria-label={`Share ${title}`}
      title="Share this writing"
    >
      <Share2 className="h-[18px] w-[18px]" strokeWidth={1.6} />
    </Button>
  );
};

export default ShareWriting;