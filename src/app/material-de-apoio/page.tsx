import { BlogMaterialPreview } from "@/components/BlogMaterialPreview";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { itemsMaterialList } from "../api/material/items-list";
import { config } from "@/config";

export async function generateMetadata() {
  return {
    title: "Material de apoio",
    description: "Encontre recursos exclusivos para sua jornada financeira: calculadoras, planilhas, cursos e ebooks gratuitos para facilitar o aprendizado e melhorar sua organização financeira. Acesse nosso material de apoio e impulsione seu conhecimento em finanças!",      
    alternates: {
      canonical: `${config.baseUrl}/material-de-apoio`, 
    },
    robots: {
      index: true, 
      follow: true, 
    },
  };
}

const Page = async () => {
  
  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <BlogMaterialPreview materiais={itemsMaterialList} />
      <Footer />
    </div>
  );
};

export default Page;
