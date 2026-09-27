import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/iatw-logo.svg";

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
      <header className="border-b border-border/70">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center px-6 py-5 sm:grid-cols-[150px_1fr_150px] md:px-10 md:py-7">
          <Link to="/" className="justify-self-center sm:justify-self-start" aria-label="I Am The World home">
            <img
              src={logo}
              alt="I Am The World — What runs the world runs the me"
              className="h-[76px] w-auto md:h-[88px]"
            />
          </Link>
          <nav className="mt-5 flex justify-center gap-5 sm:mt-0 md:gap-9" aria-label="Main navigation">
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

      <main className="flex-1 pb-20">
        {wide ? children : <div className="max-w-[640px] mx-auto px-6">{children}</div>}
      </main>

      <footer className="relative mt-10 overflow-hidden border-t border-border/60 pt-16">
        <div className="relative z-10 mx-auto max-w-[640px] px-6 pb-20 text-center space-y-2">
          <p className="font-heading text-base text-primary">I Am The World</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-body">Writings of Sudheendra Chaitanya</p>
        </div>
        <svg aria-hidden="true" viewBox="0 0 1440 210" preserveAspectRatio="none" className="block h-28 w-full text-primary/10 md:h-44">
          <path fill="currentColor" d="M0 176 74 152l42 9 76-60 53 42 47-28 38 19 91-101 75 107 55-54 67 67 42-23 51 17 58-57 69 53 44-30 65 39 54-18 64 25 76-86 81 79 55-31 67 49 67-32 38 18v54H0Z" />
          <path fill="currentColor" opacity=".45" d="M0 193 109 166l73 20 82-45 99 44 86-31 81 34 121-75 103 70 78-45 91 46 84-32 106 34 91-39 116 46v17H0Z" />
        </svg>
      </footer>
    </div>
  );
};

export default SiteLayout;
