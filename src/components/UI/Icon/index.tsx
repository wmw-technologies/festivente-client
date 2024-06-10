import styles from "./index.module.scss"
import * as Icons from '@heroicons/react/24/solid'

type UIIconProps = {
    name: keyof typeof Icons;
    smaller?: boolean;
};

export default function UIIcon({name, smaller}: UIIconProps) {
    const Icon = Icons[name];

    return <Icon name={name} className={`${styles.icon} ${smaller ? styles.small : styles.large}`}/>;
}