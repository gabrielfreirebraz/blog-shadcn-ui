'use client';

import React from 'react';
import Script from 'next/script';
import { useAdSlotStore } from '../store/google-store';


export function GPTScript() {
  const { setGoogletagLoaded } = useAdSlotStore();

  return (
    <>
      <Script
        id='gpt-script'
        strategy='lazyOnload'
        type='text/javascript'
        src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'
        onLoad={() => {
          setGoogletagLoaded(true); // Atualiza o Zustand
        }}
      >
        {`
          var googletag = googletag || {};
          googletag.cmd = googletag.cmd || [];
        `}
      </Script>
    </>
  );
}