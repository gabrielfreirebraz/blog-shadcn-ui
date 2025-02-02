'use client';

import { useEffect } from 'react';


import { useAdSlotStore } from '../store/google-store';
import { Banner, Googletag, Slot, TSlotMap, TTargeting } from '@/features/ads/types';
import { GPTAdsConstants, TGPTAdsConstantsKeys } from '../consts';

export const GPTEnableServices = ({ targeting }: TTargeting) => {
  const { googletagLoaded, banners } = useAdSlotStore();

  useEffect(() => {
    googletagLoaded && AdManagerServices({ banners, targeting }).enable();
  }, [googletagLoaded]);

  return <></>;
};

const AdManagerServices = ({
  banners,
  targeting,
}: {
  banners: Banner[];
  targeting?: TTargeting | any;
}) => {
  const { googletag } = window as unknown as { googletag: Googletag };

  const enable = () => {
    googletag.cmd.push(() => {
      // loop define slots
      banners.map((banner: Banner) => {
        createAdSlot(banner.id);
      });

      // set campaign skus
      !!targeting && setAdTargeting({ targeting });

      // enable services ads
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    });

    googletag.cmd.push(() => {
      // loop to display banners
      banners.map((banner: Banner) => {
        googletag.display(`${banner.divName}`);
      });
    });
  };

  const createAdSlot = (idBanner: TGPTAdsConstantsKeys) => {
    const ad = GPTAdsConstants[idBanner];
    const mapping = ad.mapping;
    const sizes = ad.sizes;

    const slot = googletag.defineSlot(
      `/${process.env.GAM_ACCOUNT_ID}/banner-cf-${idBanner.toLowerCase()}`,
      sizes as [number, number] | [number, number][],
      `div-gpt-ad-${idBanner.toLowerCase()}`
    );
    slot && setupResponsiveAdSlot(slot, mapping);
  };

  const setAdTargeting = ({ targeting }: TTargeting) => {
    if (!targeting || !targeting.key || !targeting.skus) return;

    if (targeting.key !== '' && targeting.skus.length > 0) {
      googletag.pubads().setTargeting(targeting.key, targeting.skus);
    }
  };

  const setupResponsiveAdSlot = (slot: Slot, mapping: TSlotMap) => {
    const adMapping = googletag.sizeMapping();

    for (const [breakpoint, size] of Object.entries(mapping)) {
      const [width, height] = size as [number, number];
      if (width > 0 && height > 0) {
        adMapping.addSize([Number(breakpoint), 0], [width, height]);
      }
    }

    slot && slot.defineSizeMapping(adMapping.build()).addService(googletag.pubads());
  };

  return { enable };
};