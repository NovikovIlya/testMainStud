import React, {ReactNode} from 'react';

interface Props {
    children: ReactNode
    color: string
    onClick: () => void
}

export const WrapperButton = ({children, color, onClick}: Props) => {
    return (
        <div className={`flex gap-2 w-[178px] bg-[${color}] p-[10px] rounded-[5px] cursor-pointer items-center`}
             onClick={onClick}
        >
            {children}
        </div>
    );
};

