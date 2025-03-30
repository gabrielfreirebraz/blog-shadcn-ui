import { AFFILIATES, AFFILIATES_KEY_NAME } from "@/utils/affiliateLinks";

export const GPTAdsConstants = {
  "INTERNA-TOPO": {
    sizes: [728, 90],
    mapping: {
      0: [0, 0],
      769: [728, 90],
    },
  },
  "INTERNA-LATERAL": {
    sizes: [300, 600],
    mapping: {
      0: [0, 0],
      769: [300, 600],
    },
  },
  MOBILE: {
    sizes: [336, 280],
    mapping: {
      0: [336, 280],
    },
  },
};

export type TGPTAdsConstantsKeys = keyof typeof GPTAdsConstants;

export const refreshSlots = function () {
  if (typeof window !== "undefined" && window.googletag) {
    const { googletag } = window;
    googletag.cmd.push(() => {
      googletag.pubads().refresh();
    });
  }
};
