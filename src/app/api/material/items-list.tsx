import { FormCalculadora13 } from "@/features/calculadora13/components/FormCalculadora13";
import { FormCalculadoraRescisao } from "@/features/calculadoraRescisao/components/FormCalculadoraRescisao";


export const itemsMaterialList: MaterialPreview[] = [
  {
    link: 'material-de-apoio/calculadora/rescisao',
    title: 'Calculadora de Rescisão: Simule e Planeje Seus Ganhos',
    description: 'Disponibilizamos uma calculadora de rescisão para ajudá-lo a simular seus ganhos de forma rápida e prática. Preencha o formulário e saiba o valor exato que receberá, ideal para planejamento financeiro e controle dos gastos ao final do contrato de trabalho.',
    dateRef: `2024-12-08`,
    image: { src: '/images/calculadora-rescisao.webp', alt: 'Imagem de calculadora de rescisão' },
    enable: true,
    category: 'form',
    formComponent: FormCalculadoraRescisao,
  },
  {
    link: 'material-de-apoio/calculadora/13-salario',
    title: 'Calculadora de Décimo Terceiro Salário: Simule e Planeje Seus Ganhos',
    description: 'Disponibilizamos uma calculadora de décimo terceiro salário para ajudá-lo a simular seus ganhos de forma rápida e prática. Preencha o formulário e saiba o valor exato que receberá, ideal para planejamento financeiro e controle dos gastos de fim de ano.',
    dateRef: `2024-11-10`,
    image: { src: '/images/calculadora-13.webp', alt: 'Imagem de calculadora de décimo terceiro salário' },
    enable: true,
    category: 'form',
    formComponent: FormCalculadora13,
  },
  {
    link: 'material-de-apoio/planilha/gastos-mensais',
    title: 'Planilha de Controle de Gastos Mensais para Solteiros: Simples e Fácil de Usar',
    description: 'Baixe gratuitamente nossa planilha de controle de gastos mensais, projetada para organizar suas despesas básicas de forma simples e prática. Ideal para quem busca acompanhar as finanças com facilidade e sem coisas complicadas ou díficeis de entender.',
    dateRef: `2024-11-09`,
    image: { src: '/images/planilha-gastos-mensais.webp', alt: 'Finance Tips Image' },
    enable: true,
    category: 'download',
    downloadUrl: 'https://docs.google.com/spreadsheets/d/1L54b0VkEAUKiMvHtK1EcZ5rsn7eEBY_R/edit?usp=sharing&ouid=115491023356602678566&rtpof=true&sd=true'
  },
  {
    link: 'material-de-apoio/planilha/gastos-mensais',
    title: 'Planilha de Orçamento Familiar Gratuita: Diga Adeus ao Caos Financeiro',
    description: 'Assuma o controle do seu orçamento familiar com uma planilha prática e completa. Monitore receitas, despesas e alcance suas metas financeiras com facilidade. É grátis, baixe agora!',
    dateRef: `2024-12-20`,
    image: { src: '/images/planilha-gastos-mensais-familiar.webp', alt: 'Finance Tips Image' },
    enable: true,
    category: 'download',
    downloadUrl: 'https://docs.google.com/spreadsheets/d/1z-T-5WRzMeUtTnNwflftRAnwasV0DCn4/edit?usp=sharing&ouid=115491023356602678566&rtpof=true&sd=true'
  },
];