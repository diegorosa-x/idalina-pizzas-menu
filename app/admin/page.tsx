'use client';

import { useEffect } from 'react';
import AppClient from '@/components/AppClient';

export default function AdminPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') window.location.hash = 'admin';
  }, []);

  return <AppClient />;
}
