'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

type UITooltipProps = {
  text: string;
  children: ReactNode;
  overlowing?: boolean;
  overflowWidth?: number;
};

export default function UITooltip({ text, children, overlowing, overflowWidth }: UITooltipProps) {
  const [visible, setVisible] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childrenRef.current && overlowing) {
      setIsOverflowing(childrenRef.current.scrollWidth > childrenRef.current.clientWidth);
    }
  }, [children, overlowing]);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className={styles.tooltipContainer} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {overlowing ? (
        <div className={styles.tooltipChildren} ref={childrenRef} style={{ width: overflowWidth }}>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
      {visible && isOverflowing && (
        <div className={styles.tooltip} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
          <span>{text}</span>
        </div>
      )}
    </div>
  );
}
