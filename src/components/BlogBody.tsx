import MarkdownRenderer from "@/components/MarkdownRenderer";
import { sanitizeHtml } from "@/lib/sanitize";

export default function BlogBody({ body }: { body: string }) {
  const looksLikeHtml = /<\/?(p|h2|h3|strong|em|u|blockquote|ul|ol|li|a|img|br|pre|code)(\s|>)/i.test(body);
  if (!looksLikeHtml) return <MarkdownRenderer body={body} />;
  return <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }} />;
}
