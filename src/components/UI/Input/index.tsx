import styles from './index.module.scss';
import UIIcon from '@/src/components/UI/Icon';

type UIInputProps = {
    isOpen: boolean;
    variant?: 'gray' | 'blue';
};

export default function UIInput({ isOpen, variant }: UIInputProps) {
    return (
        <button type='button' title={isOpen ? 'Rozwiń' : 'Zwiń'} className={styles.button}>
            <UIIcon name={isOpen ? 'PlusIcon' : 'MinusIcon'} />
        </button>
    );
}
