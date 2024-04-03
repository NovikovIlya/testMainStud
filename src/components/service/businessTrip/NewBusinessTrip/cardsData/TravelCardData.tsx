import React from 'react';
import {RowCardData} from "./RowCardData";
import {WrapperForCardData} from "./WrapperForCardData";

export const TravelCardData = () => {
    return (
        <WrapperForCardData>
            <RowCardData title={'Организация'} data={'МГУ'}/>
            <RowCardData title={'Адрес'} data={'Москва, Кремлёвская наб., 1, к1, кв 111'}/>
            <RowCardData title={'Дата начала'} data={'01.04.2024'}/>
            <RowCardData title={'Дата окончания'} data={'07.04.2024'}/>
            <RowCardData title={'Продолжительность'} data={'МГУ'}/>
        </WrapperForCardData>
    );
};

