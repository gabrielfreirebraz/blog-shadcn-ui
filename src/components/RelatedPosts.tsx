"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import type { GetPostResult, GetPostsResult, GetRelatedPostsResult, TagInPost } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";
import type { FunctionComponent } from "react";

export const RelatedPosts: FunctionComponent<{
  // posts: GetRelatedPostsResult["posts"];
  posts: GetPostResult["post"][];
}> = ({ posts }) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="my-8 max-w-prose text-xl mx-auto">
      <div className="mb-6 text-lg font-semibold tracking-tight">
        Posts relacionados
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => {
          const categorySlug = post?.tags[0].name

          return post && (
            <div className=" bg-muted overflow-hidden rounded-lg" key={post.id}>
              <Link href={`/${categorySlug}/${post.slug}`}>
                <AspectRatio ratio={16 / 9} className="w-full">
                  <Image
                    src={post.image || "/images/placeholder.png"}
                    alt={post.title}
                    fill
                    className="h -full min-h-full min-w-full object-cover object-center"
                  />
                </AspectRatio>
              </Link>
              <div className="prose prose-sm dark:prose-invert p-4">
                <h3 className="line-clamp-2">{post.title}</h3>
                <p className="line-clamp-3">{post.description}</p>
                <Link href={`/${categorySlug}/${post.slug}`}>
                  <strong>Leia o Artigo Completo</strong>
                </Link>
              </div>
            </div>)
          })}
      </div>
    </div>
  );
};
