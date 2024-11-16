"use client";

import Image from "next/image";

import { Button } from "./ui/button";
import Link from "next/link";


export const BlogMaterialContent = ({ material }: { material: MaterialPreview}) => {
  return material.category === 'download' && (
      <div className="mx-auto mb-10 lg:mt-20 break-words prose-h1:text-4xl prose-h1:font-bold dark:prose-invert">
        
        <div className="max-w-4xl mx-auto py-6 space-y-4">
          <h1 className="mb-10">{material.title}</h1>

            <div className="flex py-6 flex-col md:flex-row">
              <Image
                  src={`${material.image?.src}`}
                  alt={`${material.image?.alt}`}
                  width={150} 
                  height={150}
                  className="rounded-lg object-cover ml-3 mb-2 md:m-auto"
                />
              <p className="text-sm text-gray-600 mx-4 my-1 flex flex-col">
                {material.description}
                
                {material?.downloadUrl && 
                  <Link href={material.downloadUrl} className="w-28 md:ml-auto mt-auto pt-6" target="_blank">
                    <Button>Baixe agora</Button>
                  </Link>}
              </p>
            </div>
            
        </div>
      </div>
  );
};
