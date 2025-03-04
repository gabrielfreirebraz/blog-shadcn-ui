export const GPTAdsConstants = {
  'INTERNA-TOPO': {
    sizes: [728, 90],
    mapping: {
      0: [0, 0],
      769: [728, 90],
    },
    src: 'https://hcinvestimentos.com/wp-content/uploads/2012/03/banner728x90.gif',
  },
  'INTERNA-LATERAL': {
    sizes: [300, 600],
    mapping: {
      0: [0, 0],
      769: [300, 600],
    },
    src: '',
  },
  'MOBILE': {
    sizes: [336, 280],
    mapping: {
      0: [336, 280],
    },
    src: 'https://hcinvestimentos.com/wp-content/uploads/2012/03/banner336x280.gif',
  },
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