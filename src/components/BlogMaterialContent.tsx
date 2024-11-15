"use client";

import Image from "next/image";

import { Button } from "./ui/button";
import Link from "next/link";


export const BlogMaterialContent = ({ material }: { material: MaterialPreview}) => {
  return material.category === 'download' && (
      <div className="mx-auto mb-10 lg:mt-20 break-words prose-h1:text-4xl prose-h1:font-bold dark:prose-invert">
        
        <div className="max-w-4xl mx-auto py-6 space-y-4">
          <h1 className="mb-10">{material.title}</h1>

            <div className="flex py-6">
              <Image
                  src="/images/calculadora-13.webp"
                  alt="Imagem de calculadora de décimo terceiro salário"
                  width={150} 
                  height={150}
                  className="rounded-lg object-cover"
                />
              <p className="text-sm text-gray-600 mx-4 my-1 flex flex-col">
                {material.description}
                
                {material?.downloadUrl && 
                  <Link href={material.downloadUrl} className="w-28 ml-auto mt-auto" target="_blank">
                    <Button>Baixe agora</Button>
                  </Link>}
              </p>
            </div>
            
        </div>
      </div>
  );
};
