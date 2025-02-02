'use client';

import React from 'react';

import { GPTAdsConstants, TGPTAdsConstantsKeys } from '../consts';
import { useAdManager } from '../hooks';

type TAdsSlotProps = {
  id: TGPTAdsConstantsKeys;
  fixed?: boolean;
};

export function AdsSlot({ id, fixed }: Readonly<TAdsSlotProps>) {
  const ad = GPTAdsConstants[id];

  useAdManager({
    id,
  });

  return (
    <div className={`${fixed && 'fixed top-0 left-1/2 transform -translate-x-1/2 z-50'}`}>
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
        />
      </div>
    </div>
  );
}