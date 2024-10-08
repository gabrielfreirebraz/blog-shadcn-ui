'use client';

import React, { useEffect } from 'react';

import { useWindowDimensions } from '@/shared/hooks/use-window-dimensions';

import { TGPTAdsConstantsKeys } from '../consts';

import { AdsSlot } from './ads-slot';

type TAdsSlotProps = {
  id?: TGPTAdsConstantsKeys;
};

export function MobileAdSlot({ id = 'MOBILE' }: Readonly<TAdsSlotProps>) {
  const { isMobile } = useWindowDimensions();

  return <>{id === 'MOBILE' && isMobile === true && <AdsSlot id={id} />}</>;
}
