import React from 'react';
import {ConfigProvider, Tabs} from "antd";
import {PlacesAndDated} from "./PlacesAndDated/PlacesAndDated";
import './NewBusinessTrip.scss'
import {keysTabsBusinessTrip, setCondition} from "../../../../store/reducers/FormReducers/StepFormBusinessTrip";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {TravelConditions} from "./TravelConditions/TravelConditions";
import {LivingConditions} from "./LivingConditions/LivingConditions";
import {Financing} from "./Financing/Financing";
import {ResultTable} from "./ResultTable/ResultTable";
import clsx from "clsx";


export const NewBusinessTrip = () => {
    const stateItem = useSelector((state: RootState) => state.ItemTabs)
    const styleBorderBottom = 'border-b-green-600 border-x-0 border-t-0 border-solid'
    const itemsTabs = [
        {
            key: keysTabsBusinessTrip.placesAndDated,
            label:
                <div className={clsx(stateItem.placesAndDated && styleBorderBottom)}>
                    Места и сроки командирования
                </div>,
            children: <PlacesAndDated/>
        },
        {
            key: keysTabsBusinessTrip.travelConditions,
            label:
                <div className={clsx(stateItem.travelConditions && styleBorderBottom)}>
                    Условия проезда
                </div>,
            children: <TravelConditions/>
        },
        {
            key: keysTabsBusinessTrip.livingConditions,
            label:
                <div className={clsx(stateItem.livingConditions && styleBorderBottom)}>
                    Условия проживания
                </div>,
            children: <LivingConditions/>
        },
        {
            key: keysTabsBusinessTrip.financing,
            label:
                <div className={clsx(stateItem.financing && styleBorderBottom)}>
                    Финансирование
                </div>,
            children: <Financing/>
        },
        {
            key: keysTabsBusinessTrip.result,
            label: 'Итог',
            children: <ResultTable/>
        },
    ]


    const keyStepBusinessTrip = useSelector((state: RootState) => state.StepFormBusinessTrip.step)
    const dispatch = useDispatch()

    //window.onbeforeunload = () => false

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
                    type="card"
                    items={itemsTabs}
                    className={`newBusinessTrip`}
                    defaultActiveKey={keyStepBusinessTrip}
                    activeKey={keyStepBusinessTrip}
                    onTabClick={(key) => {
                        dispatch(setCondition(key))
                    }}
                />
            </ConfigProvider>
        </section>
    );
};

