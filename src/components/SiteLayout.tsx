import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/articles", label: "Articles" },
  { path: "/notes", label: "Short Notes" },
  { path: "/series", label: "Series" },
];

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-8 md:py-12">
        <div className="max-w-[640px] mx-auto px-6">
          <Link to="/" className="block mb-6">
            <h1 className="font-heading text-2xl md:text-3xl font-medium tracking-wide text-primary">
              I Am The World
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-body">
              Writings of Sudheendra Chaitanya
            </p>
          </Link>
          <nav className="flex gap-6 border-b border-border pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-body transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 pb-20">
        <div className="max-w-[640px] mx-auto px-6">
          {children}
        </div>
      </main>

      <footer className="py-10 border-t border-border">
        <div className="max-w-[640px] mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground font-body">
            I Am The World — Sudheendra Chaitanya
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
