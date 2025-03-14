import React from 'react';
import { IRowCardData } from '../../../../../models/businessTrip';


export const RowCardData = (props: IRowCardData) => {
    return (
        <div className={`flex justify-between 
        items-center`}>
            <span className={`text-lg`}>
                {props.title}
            </span>
            <span className={`text-[16]/[16] font-bold text-[#1F5CB8] w-[50%] 
            text-end`}>
                {props.data}
            </span>

        </div>
    );
};

