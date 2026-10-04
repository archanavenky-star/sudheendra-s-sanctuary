import { Link, useLocation } from "react-router-dom";
import { LogOut, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { session, logout } = useAdminAuth();
  const isBlogs = location.pathname === "/admin/blogs";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 md:px-10">
          <div>
            <Link to="/" className="font-heading text-2xl text-primary">I Am The World</Link>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Blog administration</p>
          </div>
          <div className="flex items-center gap-2">
            {isBlogs && <Button asChild size="sm"><Link to="/admin/blogs/new"><Plus className="mr-2 h-4 w-4" />New writing</Link></Button>}
            <Button variant="ghost" size="sm" asChild><Link to="/" target="_blank"><BookOpen className="mr-2 h-4 w-4" />View site</Link></Button>
            <Button variant="ghost" size="sm" onClick={() => void logout()}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10">
        <p className="mb-8 text-xs text-muted-foreground">Signed in as {session?.user.email}</p>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
