import { menuCategoryList } from "@/app/api/categoria/menu-list";
import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { AdsSlot } from "@/features/ads/ui/ad-slot";
import { wisp } from "@/lib/wisp";

export async function generateMetadata({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { category: string }
}) {

  const currentCategoryItem = findCategoryFromSlug(params.category)
  if (!currentCategoryItem) return null;

  return {
    title: currentCategoryItem.meta.title,
    description: currentCategoryItem.meta.description,
    alternates: {
      canonical: `${config.baseUrl}/categoria/${currentCategoryItem.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const findCategoryFromSlug = (categorySlug: string): MenuCategoryItem | undefined => {
  return menuCategoryList.find((currItem) => currItem.href.includes(categorySlug))
}

const Page = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { category: string }
}) => {

  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const result = await wisp.getPosts({ limit: 6, page, tags: [params.category] });

  return (
    <div className="container mx-auto px-5 mb-10">
      <AdsSlot id="INTERNA-TOPO" fixed={false} />

      <Header />
      <BlogPostsPreview posts={result.posts} categorySlug={params.category} />
      <BlogPostsPagination pagination={result.pagination} basePath={`/categoria/${params.category}?page=`} />
      <Footer />
    </div>
  );
};

export default Page;
