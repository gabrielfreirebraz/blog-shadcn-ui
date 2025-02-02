import { create } from 'zustand';

import { Banner } from '../types';

export type TAdSlotState = {
  googletagLoaded: boolean;
  firstPageLoaded: boolean;
  banners: Banner[];
};

export type TAdSlotActions = {
  setGoogletagLoaded: (googletagLoaded: boolean) => void;
  setBanner: (banner: Banner) => void;
  setFirstPageLoaded: (firstPageLoad: boolean) => void;
};

export const useAdSlotStore = create<TAdSlotState & TAdSlotActions>()((set, get) => ({
  banners: [] as Banner[],
  googletagLoaded: false,
  firstPageLoaded: true,
  setGoogletagLoaded: (googletagLoaded: boolean) => {
    set({ googletagLoaded });
  },
  setBanner: (banner: Banner) => {
    const banners = get().banners;
    const bannerExists = banners.some((b) => b.divName === banner.divName);

    if (!bannerExists) {
      banners.push(banner);
      set({ banners });
    }
  },
  setFirstPageLoaded: (firstPageLoaded: boolean) => {
    set({ firstPageLoaded });
  },
}));