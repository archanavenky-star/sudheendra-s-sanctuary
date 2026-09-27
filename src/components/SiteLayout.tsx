import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/iatw-logo.svg.asset.json";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/articles", label: "Articles" },
  { path: "/notes", label: "Short Notes" },
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
      <header className="pt-10 pb-6 md:pt-14">
        <div className="max-w-[640px] mx-auto px-6">
          <Link to="/" className="flex flex-col items-center mb-6">
            <img
              src={logo.url}
              alt="I Am The World"
              className="h-20 md:h-24 w-auto"
            />
            <p className="text-[0.7rem] md:text-xs tracking-[0.22em] uppercase text-primary/70 mt-4 font-body">
              What runs the world runs the me
            </p>
          </Link>
          <nav className="flex justify-center gap-6 md:gap-8 border-y border-border py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-body transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 pb-20">
        {wide ? children : <div className="max-w-[640px] mx-auto px-6">{children}</div>}
      </main>

      <footer className="py-10 border-t border-border">
        <div className="max-w-[640px] mx-auto px-6 text-center space-y-2">
          <p className="font-heading text-sm text-primary">I Am The World</p>
          <p className="text-xs text-muted-foreground font-body">
            Writings of Sudheendra Chaitanya
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
