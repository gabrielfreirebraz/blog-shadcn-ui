import { BlogPostContent } from "@/components/BlogPostContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RelatedPosts } from "@/components/RelatedPosts";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { GetPostResult, wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";

import type { BlogPosting, WithContext } from "schema-dts";

import Script from "next/script";


interface GetPostResultWithMetadata extends GetPostResult {
  post: GetPostResult['post'] & {
      metadata?: Record<string, string | null>; 
  };
}

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

  const { title, description, image, metadata } = result.post as GetPostResultWithMetadata['post'];
  const generatedOgImage = signOgImageUrl({ title, brand: config.blog.name });

  return {
    title,
    description,
    alternates: {
      canonical: metadata?.canonicalUrl ? metadata.canonicalUrl : undefined, 
    },
    robots: {
      index: true, 
      follow: true, 
    },
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

  const { title, publishedAt, updatedAt, image, author, metadata } = result.post as GetPostResultWithMetadata['post'];
  
  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: image ? image : undefined,
    datePublished: publishedAt ? publishedAt.toString() : undefined,
    dateModified: updatedAt.toString(),
    author: {
      "@type": "Person",
      name: metadata?.author ?? (author.name ?? undefined),
      image: metadata?.authorImage ?? (author.image ?? undefined),
    },
  };
  console.dir(result.post.author)
  return (
    <>      
      <div className="container mx-auto px-5">
        <Header />
        <BlogPostContent post={result.post} />
        <RelatedPosts posts={posts} />
        <Footer />
      </div>

      <Script
        id="json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default Page;
