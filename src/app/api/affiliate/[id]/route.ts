import { config } from "@/config";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!!params.id) {
    const newUrl = new URL(`/api/afiliado/${params.id}`, config.baseUrl);
    const response = NextResponse.redirect(newUrl.toString(), 301);
    response.headers.set("x-robots-tag", "noindex, nofollow");

    return response;
  }

  return new Response("Not Found", { status: 404 });
}
