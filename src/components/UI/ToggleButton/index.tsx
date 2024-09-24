import styles from './index.module.scss';
import UIIcon from '@/src/components/UI/Icon';

type UIToggleButtonProps = {
    isOpen: boolean;
    variant?: 'gray' | 'blue';
};

export default function UIToggleButton({ isOpen, variant }: UIToggleButtonProps) {
    return (
        <button type='button' title={isOpen ? 'Rozwiń' : 'Zwiń'} className={styles.button}>
            <UIIcon name={isOpen ? 'PlusIcon' : 'MinusIcon'} />
        </button>
    );
}

{
    /* <button
        type="button"
        :title="!isOpen ? 'Rozwiń' : 'Zwiń'"
        class="rounded-full transition-colors duration-300 p-1.5 -m-1.5"
        :class="{
            'hover:bg-gray text-black': variant === 'gray',
            'text-white hover:bg-blue-900': variant === 'blue'
        }"
    >
        <BaseIcon :name="!isOpen ? 'PlusIcon' : 'MinusIcon'" />
    </button> */
}
