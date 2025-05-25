import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Markdown from "react-markdown";



const content = `# Contato

Fale com a gente através do e-mail:

[bolsoextra.corp@gmail.com](bolsoextra.corp@gmail.com)
`

export async function generateMetadata() {
  return {
    title: "Contato",
    description: "Entre em contato com a equipe do Bolso Extra."
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
