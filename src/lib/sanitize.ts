const allowedTags = new Set(["P", "H2", "H3", "STRONG", "EM", "U", "BLOCKQUOTE", "UL", "OL", "LI", "A", "IMG", "BR", "PRE", "CODE"]);
const allowedAttributes: Record<string, Set<string>> = {
  A: new Set(["href", "title", "target", "rel"]),
  IMG: new Set(["src", "alt", "title"]),
};

const safeUrl = (value: string) => /^(https?:|mailto:|\/|#)/i.test(value) ? value : "";

export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return "";
  const document = new DOMParser().parseFromString(html, "text/html");
  const clean = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.COMMENT_NODE) { child.remove(); continue; }
      if (child.nodeType !== Node.ELEMENT_NODE) continue;
      const element = child as HTMLElement;
      if (!allowedTags.has(element.tagName)) {
        const parent = element.parentNode;
        if (!parent) continue;
        while (element.firstChild) parent.insertBefore(element.firstChild, element);
        element.remove();
        continue;
      }
      for (const attribute of Array.from(element.attributes)) {
        const allowed = allowedAttributes[element.tagName]?.has(attribute.name);
        if (!allowed) element.removeAttribute(attribute.name);
      }
      if (element.tagName === "A") {
        const href = safeUrl(element.getAttribute("href") ?? "");
        if (href) element.setAttribute("href", href); else element.removeAttribute("href");
        element.setAttribute("target", "_blank");
        element.setAttribute("rel", "noreferrer");
      }
      if (element.tagName === "IMG") {
        const src = safeUrl(element.getAttribute("src") ?? "");
        if (src) element.setAttribute("src", src); else element.remove();
      }
      clean(element);
    }
  };
  clean(document.body);
  return document.body.innerHTML;
}
