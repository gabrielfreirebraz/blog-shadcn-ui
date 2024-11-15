import { materialList } from "@/app/api/material";
import { BlogMaterialContent } from "@/components/BlogMaterialContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";


export async function generateMetadata() {
  return {
    title: "Material de apoio",
    description: "Encontre recursos exclusivos para sua jornada financeira: calculadoras, planilhas, cursos e ebooks gratuitos para facilitar o aprendizado e melhorar sua organização financeira. Acesse nosso material de apoio e impulsione seu conhecimento em finanças!",      
  };
}
 
type PageProps = {
  params: {
    category: string;
    content: string;
  };
};

const findCurrentParamsInList = (params: PageProps['params']): MaterialPreview | undefined => {
  const { category, content } = params;

  return materialList.find((currMaterial) => (
      currMaterial.link.includes(category) && currMaterial.link.includes(content)
    )
  )
}

const Page = ({ params }: PageProps) => {

  const currentMaterial = findCurrentParamsInList(params)
  if (!currentMaterial) {
    return <h3>No matching material found.</h3>;
  }
  
  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <BlogMaterialContent material={currentMaterial} />
      <Footer />
    </div>
  );
};

export default Page;
