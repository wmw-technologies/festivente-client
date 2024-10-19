'use client';

import { useStore } from '@/src/store';
import { useAuth } from '@/src/context/auth';
import { useEffect } from 'react';

export default function Dashboard() {
  const store = useStore();
  const auth = useAuth();

  useEffect(() => {}, []);
  return (
    <div>
      isCollapsed: {`${store.isCollapsed}`} {`${auth?.email}`}
    </div>
  );
}
