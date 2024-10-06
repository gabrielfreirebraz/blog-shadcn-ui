import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Link from "next/link";
import Markdown from "react-markdown";


const content = `# Política de Privacidade

A sua privacidade é importante para nós. Este documento explica como coletamos, usamos e protegemos suas informações pessoais quando você utiliza nosso blog de finanças pessoais.

## 1. Coleta de Informações
Nós coletamos informações de diversas maneiras quando você interage com o nosso site, incluindo:

Google Ads: Usamos o Google Ads para exibir anúncios, que pode coletar dados anônimos sobre suas visitas ao site, como as páginas acessadas, através de cookies.
Formulários de Cadastro e Login: Ao se cadastrar ou fazer login, coletamos informações pessoais como nome, e-mail e senha para identificação e personalização de sua experiência.
Sessão de Comentários: Quando você comenta em nossas postagens, coletamos o nome e e-mail que você fornece.
Calculadoras e Ferramentas Financeiras: Quando você utiliza nossas calculadoras financeiras ou outras ferramentas, podemos coletar os dados fornecidos para fins de cálculo e exibição dos resultados.
Informações de Navegação: Podemos coletar dados automaticamente, como seu endereço IP, tipo de navegador, páginas visitadas e tempo gasto no site.

## 2. Uso das Informações
As informações coletadas são usadas para os seguintes propósitos:

Exibir anúncios relevantes através do Google Ads.
Personalizar sua experiência e fornecer acesso às funcionalidades do site, como comentários e calculadoras financeiras.
Enviar e-mails informativos ou de marketing, caso você tenha se inscrito para receber atualizações.
Melhorar o desempenho e conteúdo do site, utilizando dados de navegação e interação.

## 3. Cookies
Nosso site utiliza cookies para melhorar sua experiência de navegação e para fornecer anúncios personalizados através de parceiros como Google Ads. Cookies são pequenos arquivos armazenados no seu dispositivo para facilitar o reconhecimento e lembrar de suas preferências.

Você pode optar por desativar os cookies diretamente nas configurações do seu navegador, mas isso pode afetar a funcionalidade de algumas partes do site.

## 4. Compartilhamento de Informações
Nós não vendemos, trocamos ou transferimos suas informações pessoais para terceiros sem o seu consentimento, exceto em casos necessários para:

Cumprir com a lei ou regulamentações.
Proteger os direitos, propriedade ou segurança de nosso site, usuários ou terceiros.
Fornecer serviços através de parceiros, como plataformas de anúncios ou de ferramentas de análise de tráfego, que seguem as mesmas políticas de privacidade.

## 5. Segurança das Informações
Nós utilizamos SSL (Secure Sockets Layer) para garantir que todas as informações pessoais fornecidas pelos usuários sejam transmitidas de forma segura e criptografada. O SSL protege dados como nomes, e-mails e senhas, assegurando que eles não possam ser interceptados durante a transmissão entre o navegador e nossos servidores.

Apesar de tomarmos medidas rigorosas para proteger suas informações, nenhuma transmissão de dados pela internet é totalmente segura, e não podemos garantir a segurança absoluta das informações transmitidas ao nosso site. No entanto, continuamos empenhados em utilizar as melhores práticas de segurança.

## 6. Links para Terceiros
Nosso site pode conter links para outros sites de interesse. No entanto, não somos responsáveis pelo conteúdo ou práticas de privacidade de sites de terceiros.

## 7. Direitos do Usuário
Você tem o direito de:

Acessar, corrigir ou excluir suas informações pessoais armazenadas em nosso sistema.
Retirar seu consentimento para o uso de dados pessoais a qualquer momento, enviando um e-mail para [contato@bolsoextra.com.br](mailto:contato@bolsoextra.com.br).
Solicitar a remoção de seus dados pessoais, exceto quando obrigados a mantê-los por questões legais.

## 8. Alterações nesta Política de Privacidade
Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise este documento regularmente para se manter informado sobre como estamos protegendo suas informações.

## 9. Contato
Se você tiver qualquer dúvida sobre esta Política de Privacidade ou o tratamento de suas informações, entre em contato conosco pelo e-mail [contato@bolsoextra.com.br](mailto:contato@bolsoextra.com.br).`



export async function generateMetadata() {
    return {
      title: "Política de Privacidade",
      description: "Saiba como protegemos suas informações pessoais no nosso blog de finanças. Entenda nossa política de coleta, uso de dados, segurança com SSL e como utilizamos cookies e ferramentas de terceiros, como Google Ads.",      
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