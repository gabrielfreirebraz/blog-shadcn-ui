'use client';

import React from 'react';

import { GPTAdsConstants, TGPTAdsConstantsKeys } from '../consts';
import { useAdManager } from '../hooks';

type TAdsSlotProps = {
  id: TGPTAdsConstantsKeys;
};

export function AdsSlot({ id }: Readonly<TAdsSlotProps>) {
  const ad = GPTAdsConstants[id];

  useAdManager({
    id,
  });

  return (
    <div className='flex flex-col items-center mt-1 md:mt-0 md:items-start'>
      <span className='font-primary font-bold text-[6px] text-functional-heavy-light uppercase'>
        publicidade
      </span>
      <div
        id={`div-gpt-ad-${id.toLowerCase()}`}
        data-testid={`div-gpt-ad-${id.toLowerCase()}`}
        style={{
          width: ad.sizes[0],
          height: ad.sizes[1],
          maxWidth: '100vw',
        }}
      />
    </div>
  );
}
