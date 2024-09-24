import { ReactNode } from 'react';
import styles from './index.module.scss';
import { Icon } from '@/src/types';
import UIIcon from '@/src/components/UI/Icon';

type UIButtonProps = {
    type?: 'button' | 'submit' | 'reset';
    variant?: string;
    icon?: any;
    children?: ReactNode;
};

function UIButton({ type = 'button', variant, children }: UIButtonProps) {
    return (
        <button type={type}>
            <span>{children}</span>
        </button>
    );
}

type UIActionButtonProps = {
    icon: Icon;
    variant?: 'gray' | 'black';
    active?: boolean;
    disabled?: boolean;
    smaller?: boolean;
};

function UIActionButton({ icon, variant = 'gray', active, disabled, smaller }: UIActionButtonProps) {
    return (
        <button type='button' disabled={disabled} aria-label='button'>
            <UIIcon name={icon} smaller={smaller} />
        </button>
    );
}

type UIToggleButtonProps = {
    isOpen: boolean;
    variant?: 'gray' | 'blue';
};

function UIToggleButton({ isOpen, variant }: UIToggleButtonProps) {
    return (
        <button type='button' title={isOpen ? 'Rozwiń' : 'Zwiń'} className={styles.actionButton}>
            <UIIcon name={isOpen ? 'PlusIcon' : 'MinusIcon'} />
        </button>
    );
}

UIButton.Action = UIActionButton;
UIButton.Toggle = UIToggleButton;

export default UIButton;
