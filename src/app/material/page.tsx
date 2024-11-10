import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Link from "next/link";
import Markdown from "react-markdown";


const content = `# Material de apoio

A sua privacidade é importante para nós. Este documento explica como coletamos, usamos e protegemos suas informações pessoais quando você utiliza nosso blog de finanças pessoais.

## 1. Coleta de Informações
Nós coletamos informações de diversas maneiras quando você interage com o nosso site, incluindo:

Google Ads: Usamos o Google Ads para exibir anúncios, que pode coletar dados anônimos sobre suas visitas ao site, como as páginas acessadas, através de cookies.
Formulários de Cadastro e Login: Ao se cadastrar ou fazer login, coletamos informações pessoais como nome, e-mail e senha para identificação e personalização de sua experiência.
Sessão de Comentários: Quando você comenta em nossas postagens, coletamos o nome e e-mail que você fornece.
Calculadoras e Ferramentas Financeiras: Quando você utiliza nossas calculadoras financeiras ou outras ferramentas, podemos coletar os dados fornecidos para fins de cálculo e exibição dos resultados.
Informações de Navegação: Podemos coletar dados automaticamente, como seu endereço IP, tipo de navegador, páginas visitadas e tempo gasto no site.
`



export async function generateMetadata() {
    return {
      title: "Material de apoio",
      description: "Encontre recursos exclusivos para sua jornada financeira: calculadoras, planilhas, cursos e ebooks gratuitos para facilitar o aprendizado e melhorar sua organização financeira. Acesse nosso material de apoio e impulsione seu conhecimento em finanças!",      
    };
  }
  
  const Page = async () => {
    return (
      <div className="container mx-auto px-5">
        <div className="prose dark:prose-invert m-auto mt-20 mb-10 blog-content">
            <Link href={`/`}>Voltar</Link><br/><br/>
            <Markdown>                
                {content}
            </Markdown>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Page;