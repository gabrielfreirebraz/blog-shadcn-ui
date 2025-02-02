import { Banner } from '@/features/ads/types';
import { create } from 'zustand';


export type TAdSlotState = {
  googletagLoaded: boolean;
  banners: Banner[];
};

export type TAdSlotActions = {
  setGoogletagLoaded: (isLoaded: boolean) => void;
  setBannerLoaded: (banner: Banner) => void;
};

export const useAdSlotStore = create<TAdSlotState & TAdSlotActions>()((set, get) => ({
  banners: [],
  googletagLoaded: false,
  setGoogletagLoaded: (loaded: boolean) => {
    set({ googletagLoaded: loaded });
  },
  setBannerLoaded: (banner: Banner) => {
    const banners = get().banners;
    const bannerExists = banners.some((b) => b.divName === banner.divName);

    if (!bannerExists) {
      banners.push(banner);
      set({ banners });
    }
  },
}));