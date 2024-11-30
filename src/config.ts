const buildConfig = () => {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
  if (!blogId) throw new Error("NEXT_PUBLIC_BLOG_ID is missing");
  const name = process.env.NEXT_PUBLIC_BLOG_DISPLAY_NAME || "Bolso Extra";
  const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || "Bolso Extra";
  const defaultTitle =
    process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "Bolso Extra - Blog sobre finanças pessoais, economia e planejamento financeiro.";
  const defaultDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "Descubra conteúdos práticos e acessíveis sobre finanças pessoais, economia e planejamento financeiro. Nosso blog oferece dicas e informações úteis para ajudar você a tomar decisões financeiras inteligentes.";

  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://bolsoextra.com.br",
    blog: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${name}`,
        },
        description: defaultDescription,
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bolsoextra.com.br"}/`,
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      "secret_used_for_signing_and_verifying_the_og_image_url",
    wisp: {
      blogId,
    },
  };
};

export const config = buildConfig();
