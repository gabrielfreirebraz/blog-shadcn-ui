"use client";

import Image from "next/image";

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from "next/link";


function getPublishedDateMessage(dateString: string): string {
  const date = new Date(dateString); 
  const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });
  const timeAgo = formatDistanceToNow(date, { locale: ptBR, addSuffix: true });

  return `Publicado ${timeAgo} (em ${formattedDate})`;
}

export const BlogMaterialPreview = ({ materiais }: { materiais: MaterialPreview[] }) => {
  
  return (
    <div>
      <div className="mx-auto mb-10 lg:mt-20 break-words prose-h1:text-4xl prose-h1:font-bold dark:prose-invert">
        
        <div className="max-w-4xl mx-auto py-6 space-y-4">
          <h1 className="mb-10">Material de Apoio</h1>

          {materiais.map((currMaterial, i) => (

              currMaterial.enable && 
                <Link href={`/${currMaterial.link}`} className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg" key={i}>
                <div className="flex-1">
                  <h2 className="text-gray-800 line-clamp-1 text-lg font-semibold">
                    {`${currMaterial.title}`}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {`${currMaterial.description}`}
                  </p>
                  
                  <p className="text-xs text-gray-500 mt-6">
                    {getPublishedDateMessage(`${currMaterial.dateRef}`)}
                  </p>
                </div>
                <div className="w-34 h-34 flex-shrink-0">
                  {currMaterial?.image && 
                    <Image
                      src={`${currMaterial.image?.src}`}
                      alt={`${currMaterial.image?.alt}`}
                      width={120} 
                      height={120}
                      className="rounded-lg object-cover"
                    />}
                </div>
              </Link>
          ))}

        </div>
      </div>
    </div>
  );
};
