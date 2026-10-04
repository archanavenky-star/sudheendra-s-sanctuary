import type { ReactNode } from "react";

const inline = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  const pattern = /(!?)\[([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] === "!") {
      nodes.push(<img key={`${match.index}-img`} src={match[3]} alt={match[2]} title={match[4]} className="my-8 max-h-[720px] w-full object-contain" loading="lazy" />);
    } else {
      nodes.push(<a key={`${match.index}-link`} href={match[3]} title={match[4]} target="_blank" rel="noreferrer" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{match[2]}</a>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

export default function MarkdownRenderer({ body }: { body: string }) {
  const blocks = body.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);

  return <>
    {blocks.map((block, index) => {
      const lines = block.split("\n");
      if (lines.every((line) => line.startsWith("- ") || line.startsWith("* "))) {
        return <ul key={index} className="mb-6 list-disc space-y-2 pl-6">{lines.map((line, i) => <li key={i}>{inline(line.slice(2))}</li>)}</ul>;
      }
      if (lines[0].startsWith("### ")) return <h3 key={index}>{inline(lines[0].slice(4))}</h3>;
      if (lines[0].startsWith("## ")) return <h2 key={index}>{inline(lines[0].slice(3))}</h2>;
      if (lines[0].startsWith("# ")) return <h2 key={index}>{inline(lines[0].slice(2))}</h2>;
      if (lines.every((line) => line.startsWith("> "))) return <blockquote key={index}><p>{inline(lines.map((line) => line.slice(2)).join(" "))}</p></blockquote>;
      if (lines.length > 1 && (lines.some((line) => /[\u0900-\u097F]/.test(line)) || lines[0].startsWith("ॐ "))) {
        return <p key={index} className="prose-invocation">{lines.map((line, i) => <span key={i} className="block">{inline(line)}</span>)}</p>;
      }
      if (/^!\[[^\]]*\]\(/.test(block)) return <div key={index}>{inline(block)}</div>;
      return <p key={index}>{lines.map((line, i) => <span key={i}>{i > 0 && <br />}{inline(line)}</span>)}</p>;
    })}
  </>;
}
