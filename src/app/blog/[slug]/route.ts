import { config } from "@/config";
import { wisp } from "@/lib/wisp";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { slug } }: { params: { slug: string } }) {
  const post = await wisp.getPost(slug);
  const categorySlug = post?.post?.tags[0]?.name;

  if (categorySlug) {
    const newUrl = new URL(`/${categorySlug}/${slug}`, config.baseUrl);
    const response = NextResponse.redirect(newUrl.toString(), 301);
    response.headers.set("x-robots-tag", "noindex, nofollow");

    return response;
  }

  return new Response("Not Found", { status: 404 });
}
