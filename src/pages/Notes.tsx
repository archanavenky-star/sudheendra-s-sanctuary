import { getArticlesByType } from "@/data/content";
import InsightsEmblem from "@/components/InsightsEmblem";
import CollectionPage from "@/components/CollectionPage";

const Notes = () => {
  const items = getArticlesByType("note");

  return <CollectionPage title="Insights" description="Brief illuminations—small enough to carry, spacious enough to return to." items={items} kind="Insight" emblem={<InsightsEmblem className="h-20 w-20 md:h-28 md:w-28" />} />;
};

export default Notes;
