import React, {ReactNode} from 'react';
import clsx from "clsx";

//приходится проверить, какой цвет приходит, т.к tailwind не видит пропс цвета
export enum ColorBg {
    BLUEF8 = '#E9EFF8',
    BLUEF2 = '#D7E2F2',
    REDE5 = '#FBE5E5',
}

interface Props {
    children: ReactNode
    color: ColorBg
    onClick: () => void
    disabled?: boolean
}


export const WrapperButton = ({children, color, onClick, disabled}: Props) => {
    return (
        <button className={clsx('border-none flex gap-2 w-[178px] p-[10px] rounded-[5px] cursor-pointer items-center',
                color === ColorBg.BLUEF8 && `bg-[#E9EFF8]`,
                color === ColorBg.BLUEF2 && `bg-[#D7E2F2]`,
                color === ColorBg.REDE5 && `bg-[#FBE5E5]`,
            )}
             onClick={onClick}
                disabled={disabled}
        >
            {children}
        </button>
    );
};

