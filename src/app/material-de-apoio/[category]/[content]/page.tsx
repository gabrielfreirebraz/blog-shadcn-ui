import { materialList } from "@/app/api/material";
import { BlogMaterialContent } from "@/components/BlogMaterialContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";


export async function generateMetadata({ params }: PageProps) {
  const currentMaterial = findCurrentParamsInList(params)

  return {
    title: `${currentMaterial?.title}`,
    description: `${currentMaterial?.description}`,      
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
