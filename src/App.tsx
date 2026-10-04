import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import SplashPage from "@/components/SplashPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Articles from "./pages/Articles";
import Notes from "./pages/Notes";
import Series from "./pages/Series";
import ReadingPage from "./pages/ReadingPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminEditor from "./pages/admin/AdminEditor";
import AdminGuard from "./components/AdminGuard";
import { AdminAuthProvider } from "./hooks/use-admin-auth";

const queryClient = new QueryClient();
const SPLASH_SESSION_KEY = "iatw-splash-seen";

const AppRoutes = () => {
  const location = useLocation();
  const [hasEntered, setHasEntered] = useState(() => {
    try { return window.sessionStorage.getItem(SPLASH_SESSION_KEY) === "true"; } catch { return false; }
  });
  const enterSite = () => {
    try { window.sessionStorage.setItem(SPLASH_SESSION_KEY, "true"); } catch { /* continue */ }
    setHasEntered(true);
  };

  if (location.pathname === "/" && !hasEntered) return <SplashPage onEnter={enterSite} />;

  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/articles" element={<Articles />} />
    <Route path="/notes" element={<Notes />} />
    <Route path="/series" element={<Series />} />
    <Route path="/read/:slug" element={<ReadingPage />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminGuard><AdminBlogs /></AdminGuard>} />
    <Route path="/admin/blogs" element={<AdminGuard><AdminBlogs /></AdminGuard>} />
    <Route path="/admin/blogs/new" element={<AdminGuard><AdminEditor /></AdminGuard>} />
    <Route path="/admin/blogs/:id/edit" element={<AdminGuard><AdminEditor /></AdminGuard>} />
    <Route path="*" element={<NotFound />} />
  </Routes>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /><Sonner />
      <BrowserRouter>
        <AdminAuthProvider><AppRoutes /></AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
