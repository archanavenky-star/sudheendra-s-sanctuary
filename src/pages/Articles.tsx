import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { getArticlesByType } from "@/data/content";
import bodhi from "@/assets/bodhi-leaf.png";
import CollectionPage from "@/components/CollectionPage";

const Articles = () => {
  const items = getArticlesByType("article");

  return <CollectionPage title="Articles" description="Standalone enquiries into life, awareness, and the ground beneath experience." items={items} kind="Article" emblem={<img src={bodhi} alt="" className="h-20 w-auto opacity-80 md:h-28" />} />;
};

export default Articles;
