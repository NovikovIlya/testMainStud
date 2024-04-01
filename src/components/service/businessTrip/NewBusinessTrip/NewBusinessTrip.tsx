import React from 'react';
import {ConfigProvider, Tabs} from "antd";
import {PlacesAndDated} from "./PlacesAndDated";
import './NewBusinessTrip.scss'

const itemsTabs = [
    {key: '1', label: 'Места и сроки командирования', children: <PlacesAndDated/>},
    {key: '2', label: 'Условия проезда', children: 'Условия проезда'},
    {key: '3', label: 'Условия проживания', children: 'Условия проживания'},
    {key: '4', label: 'Финансирование', children: 'Финансирование'},
]



export const NewBusinessTrip = () => {

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <section className={'flex flex-col gap-5'}>
            <span className={'text-2xl'}>Новая командировка</span>

            <ConfigProvider theme={{
                components: {
                    Tabs: {
                        titleFontSize: 20,
                        itemSelectedColor: 'rgba(0, 0, 0, 0.88)',
                        itemColor: 'rgba(0, 0, 0, 0.88)',
                        cardBg: 'white',

                    }
                },

            }}>
                <Tabs
                    onChange={onChange}
                    type="card"
                    items={itemsTabs}
                    className={`
                        newBusinessTrip
                    `}
                />
            </ConfigProvider>



        </section>
    );
};

