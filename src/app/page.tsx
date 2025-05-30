import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AdsSlot } from "@/features/ads/ui/ad-slot";
import { GPTEnableServices } from "@/features/ads/ui/gpt-enable-services";
import { GPTScript } from "@/features/ads/ui/gpt-script";
import { wisp } from "@/lib/wisp";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const result = await wisp.getPosts({ limit: 6, page });

  return (
    <>
      <div className="container mx-auto px-5 mb-10">
        <AdsSlot id="INTERNA-TOPO" className="hidden md:block" />
        <AdsSlot id="MOBILE" className="block md:hidden" />

        <Header />
        <BlogPostsPreview posts={result.posts} />
        <BlogPostsPagination pagination={result.pagination} />
        <Footer />
      </div>

      {/* 
      Should be enable for all adbanner pages when Adsense works fine

      <GPTScript />
      <GPTEnableServices /> 
      */}
    </>
  );
};

export default Page;
