import { useEffect } from 'react';

import { useAdSlotStore } from './store/google-ads-store';
import { GPTAdsConstants } from './consts';
import { TUseGPTAdSlotProps } from './types';

export const useAdManager = ({ id }: TUseGPTAdSlotProps) => {
  const { banners, setBannerLoaded } = useAdSlotStore();

  useEffect(() => {
    AdManager({
      id,
      bannerCofig: { banners, setBannerLoaded },
    }).initBanner();

    return () => {
      refreshSlots();
    };
  }, []);

  const refreshSlots = () => {
    if (typeof window !== 'undefined') {
      const { googletag } = window;
      if (googletag) {
        googletag.cmd.push(() => {
          googletag.pubads().refresh();
        });
      }
    }
  };
};

const AdManager = ({ id, bannerCofig }: TUseGPTAdSlotProps) => {
  const initBanner = () => {
    const ad = GPTAdsConstants[id];
    const mapping = ad.mapping;
    const sizes = ad.sizes;

    bannerCofig.setBannerLoaded({
      id,
      divName: `div-gpt-ad-${id.toLowerCase()}`,
      loaded: true,
      mapping,
      sizes,
    });
  };

  return { initBanner };
};
