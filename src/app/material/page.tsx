import { BlogMaterialContent } from "@/components/BlogMaterialContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";


export async function generateMetadata() {
  return {
    title: "Material de apoio",
    description: "Encontre recursos exclusivos para sua jornada financeira: calculadoras, planilhas, cursos e ebooks gratuitos para facilitar o aprendizado e melhorar sua organização financeira. Acesse nosso material de apoio e impulsione seu conhecimento em finanças!",      
  };
}
  

const Page = async () => {
  
  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <BlogMaterialContent />
      <Footer />
    </div>
  );
};

export default Page;
