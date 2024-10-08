'use client';

import { Fragment } from 'react';
import { AdsSlot } from '../features/ads/ui/ads-slot';

type BackWithAdsProps = {
  id?: 'INTERNA-TOPO';
  className?: string;
  page?: string;
};

export function AdsHeader({ id = 'INTERNA-TOPO', className }: Readonly<BackWithAdsProps>) {

  return (
    <Fragment>
      <div className={`flex items-start ${className}`}>
        <div className='hidden lg:flex w-full h-24 col-span-2 items-center justify-center text-[8px]'>
          <AdsSlot key={String(Math.random())} id={id} />
        </div>
      </div>
    </Fragment>
  );
}
