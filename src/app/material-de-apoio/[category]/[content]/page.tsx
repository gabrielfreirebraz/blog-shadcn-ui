import { itemsMaterialList } from "@/app/api/material/items-list";
import { BlogMaterialContent } from "@/components/BlogMaterialContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";


export async function generateMetadata({ params }: PageProps) {
  const currentMaterial = findMaterialFromParams(params)
  if (!currentMaterial) return null
  
  return {
    title: `${currentMaterial.title}`,
    description: `${currentMaterial.description}`,      
    alternates: {
      canonical: `${config.baseUrl}/${currentMaterial.link}`, 
    },
    robots: {
      index: true, 
      follow: true, 
    },
  };
}
 
type PageProps = {
  params: {
    category: string;
    content: string;
  };
};

const findMaterialFromParams = (params: PageProps['params']): MaterialPreview | undefined => {
  const { category, content } = params;

  return itemsMaterialList.find((currMaterial) => (
      currMaterial.link.includes(category) && currMaterial.link.includes(content)
    )
  )
}

const Page = ({ params }: PageProps) => {

  const currentMaterial = findMaterialFromParams(params)
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
