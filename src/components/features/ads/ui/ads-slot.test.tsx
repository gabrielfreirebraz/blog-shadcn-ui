import { render, screen } from '@testing-library/react';

import { TGPTAdsConstantsKeys } from '../consts';
import { useAdManager } from '../hooks';

import { AdsSlot } from './ads-slot';

// Mock do GPTAdsConstants
jest.mock('../consts', () => ({
  GPTAdsConstants: {
    'INTERNA-LATERAL': {
      sizes: [300, 600],
      mapping: {
        0: [0, 0],
        769: [300, 600],
      },
    },
    'INTERNA-TOPO': {
      sizes: [728, 90],
      mapping: {
        0: [0, 0],
        769: [728, 90],
      },
    },
  },
}));


// Mock do hook useAdManager
jest.mock('../hooks', () => ({
  useAdManager: jest.fn(),
}));


describe('ADSSLOT BANNER TOPO', () => {
  const sizes = [728, 90];
  const props = {
    id: 'INTERNA-TOPO' as TGPTAdsConstantsKeys,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided props', () => {
    render(<AdsSlot {...props} />);

    // Verifica se o texto "publicidade" está presente
    expect(screen.getByText('publicidade')).toBeInTheDocument();

    // Verifica se o div com o id correto está presente
    const adDiv = screen.getByTestId(`div-gpt-ad-${props.id.toLowerCase()}`);
    expect(adDiv).toBeInTheDocument();
    expect(adDiv).toHaveStyle({
      width: `${sizes[0]}px`,
      height: `${sizes[1]}px`,
      maxWidth: '100vw',
    });
  });

  it('calls useGPTAdSlot with correct arguments', () => {
    render(<AdsSlot {...props} />);

    expect(useAdManager).toHaveBeenCalledWith({
      id: 'INTERNA-TOPO',  
    });
  });
});

describe('ADSSLOT BANNER LATERAL', () => {
  const sizes = [300, 600];
  const props = {
    id: 'INTERNA-LATERAL' as TGPTAdsConstantsKeys,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided props', () => {
    render(<AdsSlot {...props} />);

    // Verifica se o texto "publicidade" está presente
    expect(screen.getByText('publicidade')).toBeInTheDocument();

    // Verifica se o div com o id correto está presente
    const adDiv = screen.getByTestId(`div-gpt-ad-${props.id.toLowerCase()}`);
    expect(adDiv).toBeInTheDocument();
    expect(adDiv).toHaveStyle({
      width: `${sizes[0]}px`,
      height: `${sizes[1]}px`,
      maxWidth: '100vw',
    });
  });

  it('calls useGPTAdSlot with correct arguments', () => {
    render(<AdsSlot {...props} />);

    expect(useAdManager).toHaveBeenCalledWith({
      id: 'INTERNA-LATERAL'
    });
  });

});
