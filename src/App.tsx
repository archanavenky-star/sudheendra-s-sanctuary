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

const queryClient = new QueryClient();

const SPLASH_SESSION_KEY = "iatw-splash-seen";

const AppRoutes = () => {
  const location = useLocation();
  const [hasEntered, setHasEntered] = useState(() => {
    try {
      return window.sessionStorage.getItem(SPLASH_SESSION_KEY) === "true";
    } catch {
      return false;
    }
  });

  const enterSite = () => {
    try {
      window.sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
    } catch {
      // The splash can still be dismissed when session storage is unavailable.
    }
    setHasEntered(true);
  };

  if (location.pathname === "/" && !hasEntered) {
    return <SplashPage onEnter={enterSite} />;
  }

  return (
    <div key={location.pathname} className="route-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/series" element={<Series />} />
        <Route path="/read/:slug" element={<ReadingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
