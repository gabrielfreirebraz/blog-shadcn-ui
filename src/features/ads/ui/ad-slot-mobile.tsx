'use client';

import React from 'react';

import { AdsSlot } from './ad-slot';
import { TGPTAdsConstantsKeys } from '../consts';

type TAdsSlotProps = {
  id?: TGPTAdsConstantsKeys;
};

export function AdSlotMobile({ id = 'MOBILE' }: TAdsSlotProps) {
  if (id !== 'MOBILE') return null;

  return (
    <div className="block md:hidden">
      <AdsSlot id={id} />
    </div>)
}