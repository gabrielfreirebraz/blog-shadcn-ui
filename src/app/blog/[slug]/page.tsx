import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { NextResponse } from "next/server";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    robots: {
      index: false, 
      follow: false, 
    },
  };
};

const Page = async ({ params: { slug } }: { params: {slug: string} }) => {
  const categorySlug = (await wisp.getPost(slug)).post?.tags[0].name;

  NextResponse.redirect(`/${categorySlug}/${slug}`, 301); // Realiza um redirecionamento 301

  return null; 
};

export default Page;
