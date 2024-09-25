// 'use client';

import { ReactNode } from 'react';
// import { useState } from 'react';
import { Icon } from '@/src/types';
import UIButton from '@/src/components/UI/Button';

type UIDropdownProps = {
    icon: Icon;
    children: ReactNode;
};

function UIDropdown({ icon, children }: UIDropdownProps) {
    // const isOpen = useState(false);
    const isOpen = false;

    function test() {
        console.log('test');
    }

    return (
        //     <div class="relative" v-click-outside="close">
        //     <BaseActionButton :icon="icon" :variant="variant" :active="isDropdown" @click.stop="isDropdown = !isDropdown" />
        //     <Transition name="fade">
        //         <ul v-show="isDropdown" class="absolute right-0 bg-white top-full min-w-[196px] mt-2 border rounded-md">
        //             <slot :close="close"> Nie dodano nic :/ </slot>
        //         </ul>
        //     </Transition>
        // </div>
        <div>
            <UIButton.Action icon={icon} />
            {isOpen && <ul>{children}</ul>}
        </div>
    );
}

type UIDropdownItemProps = {
    children: ReactNode;
};

function UIDropdownItem({ children }: UIDropdownItemProps) {
    return <button>{children}</button>;
}

UIDropdown.Item = UIDropdownItem;

export default UIDropdown;
