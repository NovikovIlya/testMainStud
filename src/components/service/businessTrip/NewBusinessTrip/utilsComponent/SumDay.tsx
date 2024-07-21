import React, {ReactNode} from 'react';

interface ISumDay {
    children: ReactNode
}

export const SumDay = ({children}: ISumDay) => {
    return (
        <span className={'absolute right-28 bottom-[31px] text-[#B3B3B3]'}>
            {children}
        </span>
    );
};

