import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Markdown from "react-markdown";



const content = `# Transparência da Página

A transparência é essencial para mim em meu blog, **Bolso Extra**. 

Quero informar que adoto uma postura completamente honesta e imparcial ao abordar produtos e serviços. 

Para mim, é essencial que meus leitores tenham acesso a informações exatas e confiáveis.

Todos os nossos conteúdos são produzidos e destinados a propósitos educativos e informativos, portanto não são considerados para aconselhamento profissional. 

Sempre consulte um especialista antes de tomar qualquer decisão com base nas informações apresentadas neste site.

Isso significa que minhas análises e recomendações são baseadas exclusivamente em minha própria experiência e pesquisa objetiva.

Acredito que essa abordagem oferece aos meus leitores uma perspectiva mais autêntica e imparcial.

Estou também em busca de uma parceria com o Google AdSense para monetizar meu blog de maneira transparente e em conformidade com os requisitos do Google. O Google AdSense é uma plataforma de anúncios confiável e respeitada, que possibilita a exibição de conteúdos publicitários relevantes para os visitantes do meu blog.

Essa parceria não compromete a imparcialidade das minhas análises e conteúdos, uma vez que os anúncios exibidos são independentes da minha linha editorial.

Quero garantir que meus leitores tenham uma experiência de leitura agradável e que sintam confiança nas informações compartilhadas. 

Portanto, a transparência é fundamental em todas as áreas do meu blog, desde a seleção dos produtos e serviços que abordo até a forma como monetizo o site.

Agradeço o apoio contínuo de meus leitores e reitero meu compromisso de manter a transparência e a honestidade em todas as atividades relacionadas ao meu blog.
`

export async function generateMetadata() {
  return {
    title: "Transparência da Página",
    description: "Descubra todas as informações sobre a transparência da nossa página, incluindo nossos objetivos, valores, práticas de conteúdo e compromisso com a verdade e a confiabilidade. Saiba mais sobre nossa missão de fornecer informações claras e precisas aos nossos visitantes.",    
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
