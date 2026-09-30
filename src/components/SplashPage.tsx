import logo from "@/assets/iatw-logo.svg";
import dawn from "@/assets/alternative-home-banner.jpg";
import { Button } from "@/components/ui/button";

type SplashPageProps = {
  onEnter: () => void;
};

const SplashPage = ({ onEnter }: SplashPageProps) => (
  <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
    <img
      src={dawn}
      alt="Himalayan peaks emerging in the light of dawn"
      className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/20 via-background/45 to-background/90" />

    <div className="fade-in flex min-h-[calc(100vh-6rem)] w-full max-w-[1440px] flex-col items-center justify-between text-center">
      <span aria-hidden="true" className="h-12" />

      <img
        src={logo}
        alt="I Am The World — What runs the world runs the me"
        className="h-auto w-[min(78vw,430px)] drop-shadow-sm"
      />

      <Button
        type="button"
        variant="ghost"
        onClick={onEnter}
        className="group h-auto rounded-none border-b border-primary/60 px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.28em] text-primary hover:bg-background/30 hover:text-foreground"
      >
        Enter
        <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
      </Button>
    </div>
  </main>
);

export default SplashPage;