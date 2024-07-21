import React from 'react';
import {WrapperForCardData} from "./WrapperForCardData";
import {RowCardData} from "./RowCardData";

const listDataLiving = [
    {id: 1, title: 'Организация', data: 'МГУ'},
    {id: 2, title: 'Адрес', data: 'Москва, Кремлёвская наб., 1, к1, кв 111'},
    {id: 3, title: 'Дата начала', data: '01.04.2024'},
    {id: 4, title: 'Дата окончания', data: '07.04.2024'},
    {id: 5, title: 'Продолжительность', data: '7 дней'},
    {id: 6, title: 'Вид транспорта', data: 'Самолет'},
    {id: 7, title: 'Пункт отправления', data: 'Казань'},
    {id: 8, title: 'Пункт назначения', data: 'Москва'},
]

export const LivingCard = () => {
    return (
        <WrapperForCardData>
            {
                listDataLiving.map(elem => (
                    <RowCardData title={elem.title} data={elem.data} key={elem.id}/>
                ))
            }
        </WrapperForCardData>
    );
};
