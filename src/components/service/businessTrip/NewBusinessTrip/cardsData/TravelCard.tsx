import React from 'react';
import {RowCardData} from "./RowCardData";
import {WrapperForCardData} from "./WrapperForCardData";

const listDataTravel = [
    {id: 1, title: 'Организация', data: 'МГУ'},
    {id: 2, title: 'Адрес', data: 'Москва, Кремлёвская наб., 1, к1, кв 111'},
    {id: 3, title: 'Дата начала', data: '01.04.2024'},
    {id: 4, title: 'Дата окончания', data: '07.04.2024'},
    {id: 5, title: 'Продолжительность', data: '7 дней'},

]

export const TravelCard = () => {
    return (
        <WrapperForCardData>
            {
                listDataTravel.map(elem => (
                    <RowCardData title={elem.title} data={elem.data} key={elem.id}/>
                ))
            }
        </WrapperForCardData>
    );
};

