'use client';

import { useStore } from '@/src/store';
import { useEffect } from 'react';

export default function Dashboard() {
  const store = useStore();

  useEffect(() => {}, []);
  return <div>isCollapsed: {`${store.isCollapsed}`}</div>;
}
