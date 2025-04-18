import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Image from "next/image";
import Markdown from "react-markdown";



const content = `

Olá! Eu sou Bruna Brandão, blogueira nas horas vagas e entusiasta do mundo das finanças. Eu sou apaixonada por aprender e compartilhar o que descubro sobre educação financeira, investimentos e gestão de finanças pessoais.

O objetivo deste blog é dividir minhas experiências e aprendizados na minha jornada de conhecimento financeiro. Aqui, você encontrará artigos que exploram temas como **economia**, **poupança**, **investimentos** e **planejamento financeiro**, sempre com o foco em tornar esses assuntos mais acessíveis e compreensíveis para todos.

A minha visão com este blog é criar um espaço onde possamos discutir e compartilhar ideias sobre como podemos melhorar nossa relação com o dinheiro, sempre de forma leve e sem complicações. Se você está buscando inspiração para sua própria jornada financeira, está no lugar certo!

#### *Importante lembrar que o conteúdo deste blog reflete apenas minhas opiniões pessoais e não constitui recomendações financeiras ou de investimento. Sempre recomendo que você busque orientação de um especialista financeiro antes de tomar qualquer decisão relacionada a investimentos ou finanças.*
`

export async function generateMetadata() {
  return {
    title: "Sobre",
    description: "Descubra conteúdos práticos e acessíveis sobre finanças pessoais, economia e planejamento financeiro. Nosso blog oferece dicas e informações úteis para ajudar você a tomar decisões financeiras inteligentes.",
    openGraph: {
      title: "Sobre",
      description: "Descubra conteúdos práticos e acessíveis sobre finanças pessoais, economia e planejamento financeiro. Nosso blog oferece dicas e informações úteis para ajudar você a tomar decisões financeiras inteligentes.",
      images: [
        signOgImageUrl({
          title: "Bruna Brandão",
          label: "Sobre",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10">
        {/* ${process.env.NEXT_PUBLIC_BASE_URL} */}
        <h1>Sobre</h1>
        
        <Image src={`/images/bruna.png`} alt="Foto de Bruna Brandão" width={350} height={500} />
        <Markdown>{content}</Markdown>
        
      </div>
      <Footer />
    </div>
  );
};

export default Page;
