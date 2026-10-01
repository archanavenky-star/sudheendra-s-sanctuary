import type { Article } from "@/data/content";

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

export const dateValue = (date: string) => {
  const [day, month, year] = date.split(" ");
  const monthIndex = MONTHS[month?.toLowerCase() ?? ""];
  if (!day || monthIndex === undefined || !year) return 0;
  return Date.UTC(Number(year), monthIndex, Number(day));
};

export const newestFirst = (items: Article[]) => [...items].sort((a, b) => dateValue(b.date) - dateValue(a.date));

export const readingTime = (body: string) => Math.max(1, Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 210));
