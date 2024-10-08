export const GPTAdsConstants = {
  'INTERNA-TOPO': {
    sizes: [728, 90],
    mapping: {
      0: [0, 0],
      769: [728, 90],
    },
  },
  'INTERNA-LATERAL': {
    sizes: [300, 600],
    mapping: {
      0: [0, 0],
      769: [300, 600],
    },
  },
  MOBILE: {
    sizes: [300, 100],
    mapping: {
      0: [300, 100],
    },
  },
  // 'NEW-HOME-DESKTOP': {
  //   sizes: [[1258, 246]],
  //   mapping: {
  //     1170: [1258, 246],
  //   },
  // },
  // 'NEW-HOME-TABLET': {
  //   sizes: [[569, 535]],
  //   mapping: {
  //     450: [569, 535],
  //   },
  // },
  // 'NEW-HOME-MOBILE': {
  //   sizes: [[320, 480]],
  //   mapping: {
  //     0: [320, 480],
  //   },
  // },
};

export type TGPTAdsConstantsKeys = keyof typeof GPTAdsConstants;

export const refreshSlots = function () {
  if (typeof window !== 'undefined' && window.googletag) {
    const { googletag } = window;
    googletag.cmd.push(() => {
      googletag.pubads().refresh();
    });
  }
};
