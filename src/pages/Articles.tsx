import { getArticlesByType } from "@/data/content";
import CollectionPage from "@/components/CollectionPage";
import bodhi from "@/assets/bodhi-leaf.png";

const Articles = () => {
  const items = getArticlesByType("article");

  return <CollectionPage title="Articles" description="Standalone enquiries into life, awareness, and the ground beneath experience." items={items} emblem={<img src={bodhi} alt="" className="h-20 w-auto opacity-80" />} />;
};

export default Articles;
