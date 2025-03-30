'use client';

import React, { useState } from 'react';

import { GPTAdsConstants, TGPTAdsConstantsKeys } from '../consts';
import { useAdManager } from '../hooks/use-ad-manager';
import { FaChevronUp } from "react-icons/fa6";

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAdBanner } from '../hooks/use-scroll';

type TAdsSlotProps = {
  id: TGPTAdsConstantsKeys;
  fixed?: boolean;
  className?: string;
};

export function AdsSlot({ id, fixed = false, className }: Readonly<TAdsSlotProps>) {
  const ad = GPTAdsConstants[id];
  const [bannerClose, setBannerClose] = useState(false);
  const [isScrolledFixed] = useScrollAdBanner(fixed);

  useAdManager({ id });

  return !bannerClose && (
    <div className={`${className && className}`}>
      <div className={`${isScrolledFixed && 'fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-white w-full border-gray-100 border-b-2 shadow-md shadow-gray-50'}`}>
        <div className='flex flex-col items-center mt-1 md:mt-0 md:items-center'>
          <span className='font-primary font-bold text-[6px] uppercase mt-4 text-[#9E9E9E]'>
            publicidade
          </span>

          <div
            id={`div-gpt-ad-${id.toLowerCase()}`}
            data-testid={`div-gpt-ad-${id.toLowerCase()}`}
            className='bg-gray-100'
            style={{
              width: ad.sizes[0],
              height: ad.sizes[1],
              maxWidth: '100vw',
            }}
          >
            <Link href="/api/afiliado/ebook-alocacao-de-ativos" rel="nofollow" target='_blank' prefetch={false}>
              <Image
                width={ad.sizes[0]}
                height={ad.sizes[1]}
                src={ad.src}
                alt="Top banner"
                priority={true}
              />
            </Link>
          </div>
        </div>

        {isScrolledFixed &&
          <>
            <FaChevronUp
              className='cursor-pointer z-10 ml-0 -mb-7 mt-1 text-2xl font-bold border-gray-100 border-2 border-t-0 py-1 px-4 h-7 w-20 bg-white rounded-b-[7px] shadow-md shadow-gray-120 hover:bg-gray-100'
              onClick={() => setBannerClose(true)}
            />
          </>
        }
      </div>
      {isScrolledFixed && <div className="mb-40"></div>}
    </div>
  );
}