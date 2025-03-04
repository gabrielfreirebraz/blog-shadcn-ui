'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { GPTAdsConstants, TGPTAdsConstantsKeys } from '../consts';
import { Banner, Googletag, Slot, TSlotMap, TTargeting } from '../types';
import { useAdSlotStore } from '../store/google-store';

export const GPTEnableServices = ({ targeting }: TTargeting) => {
  const { googletagLoaded, banners, firstPageLoaded, setFirstPageLoaded } = useAdSlotStore();

  const pathname = usePathname();
  const slug = pathname?.split('/').pop();

  useEffect(() => {
    firstPageLoaded === false &&
      googletagLoaded &&
      AdManagerServices({ banners, targeting }).enable({ refresh: true });
  }, [slug]);

  useEffect(() => {
    firstPageLoaded === true &&
      googletagLoaded &&
      AdManagerServices({ banners, targeting }).enable({
        refresh: false,
        callback: () => {
          setFirstPageLoaded(false);
        },
      });
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

  const enable = (
    { refresh, callback }: { refresh: boolean; callback?: () => void } = { refresh: false }
  ) => {
    googletag.cmd.push(() => {
      const allSlots = googletag.pubads().getSlots();

      if (refresh) {
        googletag.pubads().clearTargeting();
      }

      banners.forEach((banner: Banner) => {
        const slotAlreadyDefined = allSlots.some(
          (slot: any) => slot.getSlotElementId() === banner.divName
        );

        if (!slotAlreadyDefined) {
          createAdSlot(banner.id);
        }
      });

      if (targeting?.key && targeting.skus) {
        googletag.pubads().setTargeting(targeting?.key, targeting.skus);
      }

      if (!refresh) {
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();

        banners.forEach((banner: Banner) => {
          googletag.display(`${banner.divName}`);
        });
      } else {
        setTimeout(() => {
          googletag.pubads().refresh();
        }, 1500);
      }

      callback && callback();
    });
  };

  const createAdSlot = (idBanner: TGPTAdsConstantsKeys): Slot | null => {
    const ad = GPTAdsConstants[idBanner];
    const mapping = ad.mapping;
    const sizes = ad.sizes;

    const slot = googletag.defineSlot(
      `/${process.env.GAM_ACCOUNT_ID}/banner-cf-${idBanner.toLowerCase()}`,
      sizes as [number, number] | [number, number][],
      `div-gpt-ad-${idBanner.toLowerCase()}`
    );

    slot && setupResponsiveAdSlot(slot, mapping);

    return slot;
  };

  const setupResponsiveAdSlot = (slot: Slot, mapping: TSlotMap) => {
    const adMapping = googletag.sizeMapping();

    for (const [breakpoint, size] of Object.entries(mapping)) {
      const [width, height] = size as [number, number];
      if (width > 0 && height > 0) {
        adMapping.addSize([Number(breakpoint), 0], [width, height]);
      }
    }

    slot.defineSizeMapping(adMapping.build()).addService(googletag.pubads());
  };

  return { enable };
};