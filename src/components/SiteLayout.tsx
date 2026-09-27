import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/iatw-logo.svg";
import HimalayanFooter from "@/components/HimalayanFooter";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/home-alternative", label: "Home II" },
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
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center px-6 py-5 sm:grid-cols-[180px_1fr_180px] md:px-12 md:py-7 xl:px-20">
          <Link to="/" className="justify-self-start" aria-label="I Am The World home">
            <img
              src={logo}
              alt="I Am The World — What runs the world runs the me"
              className="h-[76px] w-auto md:h-[88px]"
            />
          </Link>
          <nav className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 sm:mt-0 md:gap-x-8" aria-label="Main navigation">
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
          <span aria-hidden="true" className="hidden sm:block" />
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
