import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const REVEAL_SELECTOR = "main h1, main h2, main h3, main p, main blockquote, main li";

const ScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    const register = (root: ParentNode) => {
      root.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
        if (element.classList.contains("scroll-reveal")) return;
        element.classList.add("scroll-reveal");
        observer.observe(element);
      });
    };

    const frame = window.requestAnimationFrame(() => register(document));
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof Element) register(node);
      }));
    });
    const main = document.querySelector("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollReveal;