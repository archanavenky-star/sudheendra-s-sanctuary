import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "iatw-series-progress";
export type SeriesProgress = Record<string, number>;

const readProgress = (): SeriesProgress => {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as SeriesProgress;
  } catch {
    return {};
  }
};

export const useSeriesProgress = () => {
  const [progress, setProgress] = useState<SeriesProgress>({});

  useEffect(() => setProgress(readProgress()), []);

  const markFinished = useCallback((seriesTitle: string, part: number) => {
    setProgress((current) => {
      const next = { ...current, [seriesTitle]: Math.max(current[seriesTitle] ?? 0, part) };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Reading continues when browser storage is unavailable.
      }
      return next;
    });
  }, []);

  return { progress, markFinished };
};
