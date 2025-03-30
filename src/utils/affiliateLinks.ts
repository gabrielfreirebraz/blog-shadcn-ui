export type AffiliateData = {
  slug: string; // Slug for the affiliate product (used as the key)
  link: string; // Affiliate URL
  name: string; // Name of the affiliate product
  price: number; // Price of the affiliate product
  src: Record<string, string>; // Banner image of the header
};

export enum AFFILIATES_KEY_NAME {
  EBOOK_ASSET_ALLOCATION = "ebook-alocacao-de-ativos",
}

export const AFFILIATES: Record<string, AffiliateData> = {
  "ebook-alocacao-de-ativos": {
    slug: "ebook-alocacao-de-ativos",
    link: "https://go.hotmart.com/T97366159Q",
    name: "Ebook on Asset Allocation",
    price: 50.0,
    src: {
      header:
        "https://hcinvestimentos.com/wp-content/uploads/2012/03/banner728x90.gif",
      mobile:
        "https://hcinvestimentos.com/wp-content/uploads/2012/03/banner336x280.gif",
    },
  },
};
