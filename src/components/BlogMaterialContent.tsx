"use client";

import Image from "next/image";

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from "next/link";


function getPublishedDateMessage(dateString: string): string {
  const date = new Date(dateString); // A data de referência
  const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });
  const timeAgo = formatDistanceToNow(date, { locale: ptBR, addSuffix: true });

  return `Publicado ${timeAgo} (em ${formattedDate})`;
}

export const BlogMaterialContent = () => {
  return (
    <div>
      <div className="mx-auto mb-10 lg:mt-20 break-words prose-h1:text-4xl prose-h1:font-bold dark:prose-invert">
        
        <div className="max-w-4xl mx-auto py-6 space-y-4">
          <h1 className="mb-10">Material de Apoio</h1>

          {/* Card 1 */}
          <Link href={`/calculadora/13-salario`} className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg">
            <div className="flex-1">
              <h2 className="text-gray-800 line-clamp-1 text-lg font-semibold">
                Calculadora de Décimo Terceiro Salário: Simule e Planeje Seus Ganhos
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Disponibilizamos uma calculadora de décimo terceiro salário para ajudá-lo a simular seus ganhos de forma rápida e prática. Preencha o formulário e saiba o valor exato que receberá, ideal para planejamento financeiro e controle dos gastos de fim de ano.

              </p>
              
              <p className="text-xs text-gray-500 mt-6">
                {getPublishedDateMessage('2024-11-10')}
              </p>
            </div>
            <div className="w-34 h-34 flex-shrink-0">
              <Image
                src="/images/calculadora-13.webp"
                alt="Imagem de calculadora de décimo terceiro salário"
                width={120} 
                height={120}
                className="rounded-lg object-cover"
              />
            </div>
          </Link>

          {/* Card 2 */}
          <Link href={`/planilha/gastos-mensais`} className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                Planilha de Controle de Gastos Mensais: Simples e Fácil de Usar
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Baixe gratuitamente nossa planilha de controle de gastos mensais, projetada para organizar suas despesas básicas de forma simples e prática. Ideal para quem busca acompanhar as finanças com facilidade e sem coisas complicadas ou díficeis de entender.
              </p>
              <p className="text-xs text-gray-500 mt-6">
                {getPublishedDateMessage('2024-11-09')}
              </p>
            </div>
            <div className="w-34 h-34 flex-shrink-0">
              <Image
                src="/images/planilha-gastos-mensais.webp"
                alt="Finance Tips Image"
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};
