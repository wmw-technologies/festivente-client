'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/src/store';
import { signOut } from '@/src/actions/auth';
import styles from './index.module.scss';
import logo from '@/public/logo noname.svg';
import Image from 'next/image';
import Link from 'next/link';
import UIDropdown from '@/src/components/UI/Dropdown';
import UIButton from '@/src/components/UI/Button';

export default function SystemHeader() {
  const router = useRouter();
  const isMenuCollapsed = useStore((state) => state.isCollapsed);
  const setIsMenuCollapsed = useStore((state) => state.toggleMenu);

  function handleCollapseMenu() {
    setIsMenuCollapsed();
  }

  function handleRedirect() {
    router.push('/my-account');
  }

  async function handleLogout() {
    await signOut();
    router.push('/sign-in');
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.headerLeft} ${isMenuCollapsed ? styles.collapsed : styles.expanded}`}>
        <Link href="/" className={styles.logoLink}>
          <Image src={logo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.headerRight}>
        <UIButton.Action icon="Bars3BottomLeftIcon" variant="gray" onClick={handleCollapseMenu} />
        <UIDropdown icon="Cog6ToothIcon">
          <UIDropdown.Item onClick={handleRedirect}>Moje konto</UIDropdown.Item>
          <UIDropdown.Item onClick={handleLogout}>Wyloguj się</UIDropdown.Item>
        </UIDropdown>
      </div>
    </header>
  );
}
