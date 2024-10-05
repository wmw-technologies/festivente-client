'use client';

import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import logoMark from '@/public/logo.svg';
import logo from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import UIDropdown from '@/src/components/UI/Dropdown';
import UIButton from '@/src/components/UI/Button';

export default function SystemHeader() {
  const router = useRouter();
  const isMenuCollapsed = false;

  function handleRedirect() {
    router.push('/my-account');
  }

  function handleLogout() {
    router.push('/sign-in');
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.headerLeft} ${isMenuCollapsed ? styles.collapsed : styles.expanded}`}>
        <Link href="/" className={`${styles.logoLink} ${isMenuCollapsed ? styles.collapsed : styles.expanded}`}>
          <Image src={isMenuCollapsed ? logoMark : logo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.headerRight}>
        <UIButton.Action icon="Bars3BottomLeftIcon" variant="gray" />
        <UIDropdown icon="Cog6ToothIcon">
          <UIDropdown.Item onClick={handleRedirect}>Moje konto</UIDropdown.Item>
          <UIDropdown.Item onClick={handleLogout}>Wyloguj się</UIDropdown.Item>
        </UIDropdown>
      </div>
    </header>
  );
}
