import {Icon as IconType} from 'iconsax-react';
import * as Icons from 'iconsax-react';

type UIIconProps = {
    name: keyof typeof Icons;
    // color?: string;
    variant?: 'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone';
    size?: number;
};

export default function UIIcon({name, variant = 'Linear', size = 24}: UIIconProps) {
    const Icon: IconType = (Icons as any)[name];

    return <Icon variant={variant} size={size}/>;
}