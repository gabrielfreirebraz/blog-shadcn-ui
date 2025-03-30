import { NextResponse } from "next/server";

const AFFILIATE_LINKS: Record<string, string> = {
  "ebook-alocacao-de-ativos": "https://go.hotmart.com/T97366159Q",  
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const affiliateUrl = AFFILIATE_LINKS[params.id];

  if (!affiliateUrl) {
    return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
  }

  return NextResponse.redirect(affiliateUrl);
}
