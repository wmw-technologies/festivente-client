'use client';

import { useStore } from '@/src/store';

export default function Dashboard() {
  const state = useStore();
  return <div>isCollapsed: {`${state.isCollapsed}`}</div>;
}
