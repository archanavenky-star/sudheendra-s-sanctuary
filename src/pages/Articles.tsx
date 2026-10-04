import bodhi from "@/assets/bodhi-leaf.png";
import CollectionPage from "@/components/CollectionPage";
import LoadingState from "@/components/LoadingState";
import { usePublishedBlogs } from "@/hooks/use-blogs";

const Articles = () => {
  const { blogs, loading, error } = usePublishedBlogs();
  if (loading) return <LoadingState />;
  if (error) return <div className="py-20 text-center text-sm text-destructive">{error}</div>;
  const items = blogs.filter((blog) => blog.type === "article");
  return <CollectionPage title="Articles" description="Standalone enquiries into life, awareness, and the ground beneath experience." items={items} kind="Article" emblem={<img src={bodhi} alt="" className="h-20 w-auto opacity-80 md:h-28" />} />;
};
export default Articles;
