import { getArticlesByType } from "@/data/content";
import CollectionPage from "@/components/CollectionPage";
import { BodhiLeafEmblem } from "@/components/CategoryEmblems";

const Articles = () => {
  const items = getArticlesByType("article");

  return <CollectionPage title="Articles" description="Standalone enquiries into life, awareness, and the ground beneath experience." items={items} emblem={<BodhiLeafEmblem className="h-20 w-auto opacity-80 md:h-28" />} />;
};

export default Articles;
