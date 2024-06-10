import {ReactNode} from "react";
// import UIIcon from "@/components/UI/Icon";

type UIButtonProps = {
    type?: "button" | "submit" | "reset";
    variant?: string;
    icon?: any;
    children?: ReactNode;
};

export default function UIButton({type = 'button', variant, children}: UIButtonProps) {
    return (
        <button type={type}>
            {/*<BaseIcon v-if="icon" :name="icon" smaller class="mr-2" />*/}
            {/*<UIIcon name={variant} size={24}/>*/}
            <span>
                {children}
            </span>
        </button>
    );
}