import { useEffect } from "react";

const DEFAULT_TITLE = "I Am The World — Sudheendra Chaitanya";
const DEFAULT_DESCRIPTION = "A quiet space for spiritual reflection. Writings by Sudheendra Chaitanya.";

const setMeta = (selector: string, value: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  element?.setAttribute("content", value);
};

const PageMeta = ({ title, description = DEFAULT_DESCRIPTION }: { title?: string; description?: string }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — I Am The World` : DEFAULT_TITLE;
    document.title = fullTitle;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('meta[name="description"]', DEFAULT_DESCRIPTION);
      setMeta('meta[property="og:title"]', DEFAULT_TITLE);
      setMeta('meta[property="og:description"]', DEFAULT_DESCRIPTION);
    };
  }, [description, title]);

  return null;
};

export default PageMeta;
