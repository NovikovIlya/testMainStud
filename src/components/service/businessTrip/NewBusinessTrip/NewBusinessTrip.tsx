import React, {useEffect, useState} from 'react';
import {ConfigProvider, Tabs} from "antd";
import {PlacesAndDated} from "./PlacesAndDated/PlacesAndDated";
import './NewBusinessTrip.scss'
import {keysTabsBusinessTrip, setCondition} from "../../../../store/reducers/FormReducers/StepFormBusinessTrip";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";

const itemsTabs = [
    {key: keysTabsBusinessTrip.placesAndDated, label: 'Места и сроки командирования', children: <PlacesAndDated/>},
    {key: keysTabsBusinessTrip.travelConditions, label: 'Условия проезда', children: 'Условия проезда'},
    {key: keysTabsBusinessTrip.livingConditions, label: 'Условия проживания', children: 'Условия проживания'},
    {key: keysTabsBusinessTrip.financing, label: 'Финансирование', children: 'Финансирование'},
]



export const NewBusinessTrip = () => {

    const test = useSelector((state: RootState) => state.StepFormBusinessTrip.step)
    const dispatch = useDispatch()
    const onChange = (key: string) => {
        console.log(key);
    };

    useEffect(() => {
        console.log(test)
    }, [test]);

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
                    defaultActiveKey={test}
                    activeKey={test}
                    onTabClick={(key) => {
                        dispatch(setCondition(key))
                    }}
                />
            </ConfigProvider>



        </section>
    );
};

