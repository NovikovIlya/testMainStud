import React, {ReactNode} from 'react';
import { IWrapperForCardData } from '../../../../../models/businessTrip';



export const WrapperForCardData = ({children}: IWrapperForCardData) => {
    return (
        <div className={`w-full bg-white p-[28px] flex flex-col gap-2 shadow-[0_0_19px_0px_#D4E3F199]
        `}>
            {children}
        </div>
    );
};

