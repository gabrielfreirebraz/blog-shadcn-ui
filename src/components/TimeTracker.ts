// components/TimeTracker.tsx
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TimeTracker = () => {
  const pathname = usePathname();

  useEffect(() => {    
    if (process.env.NODE_ENV !== 'production') {
        return;
    }

    const startTime = Date.now();

    const calculateTimeSpent = () => {
      const endTime = Date.now();
      const timeSpent = (endTime - startTime) / 1000; 

      if (window.gtag) {
        window.gtag('event', 'time_on_page', {
          event_category: 'engagement',
          event_label: `Page ${pathname}`,
          value: timeSpent,
        });
      }
    };

    return () => {
      calculateTimeSpent();
    };
  }, [pathname]);

  return null; 
};

export default TimeTracker;
