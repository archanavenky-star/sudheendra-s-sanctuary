import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/iatw-logo.svg";
import authorPhoto from "@/assets/author-bio.jpg";
import HimalayanFooter from "@/components/HimalayanFooter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/articles", label: "Articles" },
  { path: "/notes", label: "Insights" },
  { path: "/series", label: "Series" },
];

const SiteLayout = ({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center px-6 py-5 sm:grid-cols-[180px_1fr_180px] md:px-12 md:py-7 xl:px-20">
          <Link to="/" className="justify-self-start" aria-label="I Am The World home">
            <img
              src={logo}
              alt="I Am The World — What runs the world runs the me"
              className="h-[76px] w-auto md:h-[88px]"
            />
          </Link>
          <nav className="col-span-2 mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 sm:col-span-1 sm:mt-0 md:gap-x-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 text-[11px] uppercase tracking-[0.16em] font-body transition-colors duration-500 ${
                  location.pathname === item.path
                    ? "text-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {location.pathname === "/" ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto justify-self-end rounded-none border-b border-primary/45 px-0 py-2 font-body text-[10px] font-normal uppercase tracking-[0.16em] text-primary hover:bg-transparent hover:text-foreground sm:text-right"
                >
                  Meet the Author
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full overflow-y-auto border-primary/20 bg-background px-8 pb-12 pt-24 shadow-2xl sm:max-w-[520px] md:px-14 md:pt-32 [&>button]:right-7 [&>button]:top-7 [&>button]:flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-none [&>button]:border [&>button]:border-primary/30 [&>button]:text-primary [&>button>svg]:h-5 [&>button>svg]:w-5"
              >
                <SheetHeader className="space-y-0 text-left">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    The writer
                  </p>
                  <div className="mt-7 overflow-hidden border border-border">
                    <img
                      src={authorPhoto}
                      alt="Sudheendra Chaitanya"
                      width={900}
                      height={1100}
                      className="aspect-[5/4] w-full object-cover object-center"
                    />
                  </div>
                  <SheetTitle className="mt-7 font-heading text-5xl font-normal leading-tight text-primary md:text-6xl">
                    Sudheendra Chaitanya
                  </SheetTitle>
                  <SheetDescription asChild>
                    <div className="pt-9">
                      <div className="mb-9 h-px w-20 bg-primary/45" />
                      <p className="font-heading text-2xl italic leading-relaxed text-foreground">
                        A teacher of Advaita Vedanta.
                      </p>
                      <p className="mt-7 text-base leading-8 text-muted-foreground">
                        These writings are offered as an invitation to enquire—quietly, patiently, and for oneself.
                      </p>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ) : (
            <span aria-hidden="true" className="hidden sm:block" />
          )}
        </div>
      </header>

      <main className="flex-1">
        {wide ? children : <div className="max-w-[640px] mx-auto px-6">{children}</div>}
      </main>

      <HimalayanFooter />
    </div>
  );
};

export default SiteLayout;
