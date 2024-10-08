import { BlogPostContent } from "@/components/BlogPostContent";
// import { AdsSlot } from "@/components/features/ads/ui/ads-slot";
// import { GPTScript } from "@/components/features/ads/ui/gpt-script";
// import { MobileAdSlot } from "@/components/features/ads/ui/mobile-ad-slot";
// import { AdsHeader } from "@/components/ui/ads-header";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RelatedPosts } from "@/components/RelatedPosts";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";
import type { BlogPosting, WithContext } from "schema-dts";

export async function generateMetadata({
  params: { slug },
}: {
  params: Params;
}) {
  const result = await wisp.getPost(slug);
  if (!result || !result.post) {
    return {
      title: "Blog post not found",
    };
  }

  const { title, description, image } = result.post;
  const generatedOgImage = signOgImageUrl({ title, brand: config.blog.name });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [generatedOgImage, image] : [generatedOgImage],
    },
  };
}
interface Params {
  slug: string;
}

const Page = async ({ params: { slug } }: { params: Params }) => {
  const result = await wisp.getPost(slug);
  const { posts } = await wisp.getRelatedPosts({ slug, limit: 3 });

  if (!result || !result.post) {
    return notFound();
  }

  const { title, publishedAt, updatedAt, image, author } = result.post;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: image ? image : undefined,
    datePublished: publishedAt ? publishedAt.toString() : undefined,
    dateModified: updatedAt.toString(),
    author: {
      "@type": "Person",
      name: author.name ?? undefined,
      image: author.image ?? undefined,
    },
  };

  return (
    <>
      {/* <GPTScript /> */}
      {/* <AdsHeader className='px-0 md:px-4 lg:px-0 mb-4' /> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-5">
        <Header />
        <BlogPostContent post={result.post} />
        <RelatedPosts posts={posts} />
        <Footer />
      </div>

      {/* <div className='hidden lg:flex w-[300px] h-[800px] justify-center text-[8px]'>
        <AdsSlot id='INTERNA-LATERAL' />
      </div> */}

      {/* <MobileAdSlot id='MOBILE' /> */}
    </>
  );
};

export default Page;
