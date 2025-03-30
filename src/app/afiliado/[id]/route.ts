import { AFFILIATE_LINKS } from "@/utils/affiliateLinks";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const affiliateUrl = AFFILIATE_LINKS[params.id];

  if (!affiliateUrl) {
    return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
  }

  return NextResponse.redirect(affiliateUrl);
}
