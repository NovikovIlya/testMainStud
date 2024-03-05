import React, {ReactNode} from 'react';

interface IWrapperForServices {
    children: ReactNode
}

export const WrapperForServices = ({children}: IWrapperForServices) => {
    return (
        <div className="bg-[#F5F8FB] w-full pt-14 pl-14 pr-28 mt-20 pb-10">
            {children}
        </div>
    );
};

