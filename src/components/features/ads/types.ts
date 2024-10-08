import { TGPTAdsConstantsKeys } from './consts';

export type TTargeting = {
  targeting?: { key: string | null; skus: string[] | null } | null;
};

export type TSlotMap = Record<number, Array<number> | Array<number[]>>;

export type TUseGPTAdSlotProps = {
  id: TGPTAdsConstantsKeys;
  slotsLimit?: number;
  bannerCofig?: any;
};

export interface Banner {
  id: TGPTAdsConstantsKeys;
  divName: string;
  sizes?: number[] | number[][];
  mapping?: Record<number, number[] | number[][]>;
  loaded: boolean;
}

export interface Googletag {
  cmd: Array<() => void>;
  pubads: () => PubAdsService;
  sizeMapping: () => SizeMappingBuilder;
  defineSlot: (adUnitPath: string, size: GeneralSize, div: string) => Slot | null;
  enableServices: () => void;
  display: (divOrSlot: string | Slot) => void;
  destroySlots: (slots?: Slot[]) => boolean;
}

export interface Slot {
  defineSizeMapping: (sizeMapping: SizeMappingArray) => Slot;
  addService: (service: PubAdsService) => Slot;
  [key: string]: any;
}

interface PubAdsService {
  enableSingleRequest: () => void;
  setTargeting: (key: string, value: string | string[]) => void;
  addEventListener: (eventType: string, listener: (event: Event) => void) => void;
  [key: string]: any;
}

interface SizeMappingBuilder {
  addSize: (viewportSize: [number, number], slotSize: GeneralSize) => SizeMappingBuilder;
  build: () => SizeMappingArray;
}

type GeneralSize = SingleSize | MultiSize;
type SingleSize = [number, number];
type MultiSize = SingleSize[];
type SizeMappingArray = Array<{ viewport: SingleSize; sizes: GeneralSize }>;
