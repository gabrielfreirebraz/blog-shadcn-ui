"use client";
import { cn } from "@/lib/utils";
import { GetPostsResult } from "@/lib/wisp";
import { formatDate } from "date-fns";
import { ptBR } from 'date-fns/locale';
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export const BlogPostPreview: FunctionComponent<{
  post: GetPostsResult["posts"][0];
  categorySlug: string | undefined;
}> = ({ post, categorySlug }) => {  
  const slug = categorySlug ?? post.tags[0].name;
  
  return (
    <div className="break-words">
      <Link href={`/${slug}/${post.slug}`}>
        <div className="aspect-[16/9] relative">
          <Image
            alt={post.title}
            className="object-cover"
            src={post.image || "/images/placeholder.webp"}
            fill
          />
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
        <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
          <Link href={`/${slug}/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="prose lg:prose-lg italic tracking-tighter text-muted-foreground">
          {formatDate(post.publishedAt || post.updatedAt, "dd MMMM yyyy", { locale: ptBR })}
        </div>
        <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
          {post.description}
        </div>
        <div className="text-sm text-muted-foreground">
          {post.tags.map((tag) => (
            <div key={tag.id} className="mr-2 inline-block">
              <Link href={`/tag/${tag.name}`}>#{tag.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogPostsPreview: FunctionComponent<{
  posts: GetPostsResult["posts"];
  className?: string;
  categorySlug?: string;
}> = ({ posts, className, categorySlug }) => {
  
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-16 lg:gap-22 md:grid-cols-2 md:my-16 my-8",
        className
      )}
    >
      {posts.map((post: GetPostResultWithMetadata['post']) => (
        <BlogPostPreview key={post.id} post={post} categorySlug={categorySlug} />
      ))}
    </div>
  );
};
