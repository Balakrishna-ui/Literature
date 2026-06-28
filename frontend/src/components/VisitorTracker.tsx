'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const API_BASE = '';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith('/admin')) return;

    fetch(`${API_BASE}/api/visitors/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageUrl: pathname }),
    }).catch(() => {
      // Silently ignore tracking errors
    });
  }, [pathname]);

  return null;
}

