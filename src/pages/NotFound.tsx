import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageMeta from "@/components/PageMeta";

const NotFound = () => {
  return (
    <SiteLayout wide><PageMeta title="Page not found" description="This page could not be found." /><div className="mx-auto flex min-h-[50vh] max-w-[900px] flex-col items-center justify-center px-6 py-24 text-center"><p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">A path gone quiet</p><h1 className="mt-7 font-heading text-5xl font-normal text-primary md:text-7xl">There is nothing to seek here.</h1><Link to="/" className="mt-10 inline-block min-h-11 border-b border-primary/50 py-3 text-sm text-primary">Return to Home →</Link></div></SiteLayout>
  );
};

export default NotFound;
