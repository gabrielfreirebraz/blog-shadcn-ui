import { useEffect } from 'react';

import { useAdSlotStore } from './store/google-ads-store';
import { GPTAdsConstants } from './consts';
import { TUseGPTAdSlotProps } from './types';

const AdManager = ({ id, bannerLoadedInPage }: TUseGPTAdSlotProps) => {
  const initBanner = () => {
    const ad = GPTAdsConstants[id];
    const mapping = ad.mapping;
    const sizes = ad.sizes;

    bannerLoadedInPage?.setBanner({
      id,
      divName: `div-gpt-ad-${id.toLowerCase()}`,
      loaded: true,
      mapping,
      sizes,
    });
  };

  return { initBanner };
};

export const useAdManager = ({ id }: TUseGPTAdSlotProps) => {
  const { banners, setBanner } = useAdSlotStore();

  useEffect(() => {
    AdManager({
      id,
      bannerLoadedInPage: { banners, setBanner },
    }).initBanner();
  }, [id]);
};
