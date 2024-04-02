import React from 'react';
import {RowCardData} from "./rowCardData";

export const CardData = () => {
    return (
        <div className={`
         w-full
         bg-white
         p-[28px]
         flex
         flex-col
         gap-2
         shadow-[0_0_19px_0px_#D4E3F199] 
        `}>
            <RowCardData title={'Организация'} data={'МГУ'}/>
            <RowCardData title={'Адрес'} data={'Москва, Кремлёвская наб., 1, к1, кв 111'}/>
            <RowCardData title={'Дата начала'} data={'01.04.2024'}/>
            <RowCardData title={'Дата окончания'} data={'07.04.2024'}/>
            <RowCardData title={'Продолжительность'} data={'МГУ'}/>
        </div>
    );
};

