import { BlogPostContent } from "@/components/BlogPostContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RelatedPosts } from "@/components/RelatedPosts";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";

import type { BlogPosting, WithContext } from "schema-dts";

import { GetPostResult } from "@wisp-cms/client";
import { BlogPostCommentSection } from "@/components/BlogPostCommentSection";

import Script from "next/script";
import AuthWrapper from "@/components/AuthWrapper";


export const revalidate = 604800; // 7 days to revalidate as ISR (NO SSR)

export async function generateMetadata({
  params: { post: postSlug, category: categorySlug },
}: {
  params: Params;
}) {

  const result = await wisp.getPost(postSlug);
  if (!result || !result.post) {
    return {
      title: "Blog post not found",
    };
  }

  const { title, description, image, metadata } = result.post as GetPostResultWithMetadata['post'];
  const generatedOgImage = signOgImageUrl({ title, brand: config.blog.name });
  const canonical = `${config.baseUrl}/${categorySlug}/${postSlug}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: canonical, 
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
  post: string;
  category: string;
}

const Page = async ({ params: { post: slug, category: categorySlug } }: { params: Params }) => {
  const result = await wisp.getPost(slug);
  const { posts } = await wisp.getRelatedPosts({ slug, limit: 3 });
  
  // ***getRelatedPosts doesn't bring us the tags!!!!***
  const relatedPosts: GetPostResult["post"][] = await Promise.all(
    posts.map(async (post) => {
      return (await wisp.getPost(post.slug))["post"];
    })
  );

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
  
  return (
    <>      
      <div className="container mx-auto px-5">
        <Header />
        <BlogPostContent post={result.post} />
        <RelatedPosts posts={relatedPosts} />
        <AuthWrapper>
          <BlogPostCommentSection postId={result.post.id} />
        </AuthWrapper>
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
