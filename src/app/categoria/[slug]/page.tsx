import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { wisp } from "@/lib/wisp";

const Page = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { slug: string }
}) => {
  
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const result = await wisp.getPosts({ limit: 6, page, tags: [params.slug] });

  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <BlogPostsPreview posts={result.posts} />
      <BlogPostsPagination pagination={result.pagination} basePath={`/categoria/${params.slug}?page=`} />
      <Footer />
    </div>
  );
};

export default Page;
