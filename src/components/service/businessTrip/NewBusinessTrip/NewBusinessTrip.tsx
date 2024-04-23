import React, {useState} from 'react';
import {ConfigProvider, Tabs} from "antd";
import {PlacesAndDated} from "./Staff/PlacesAndDated/PlacesAndDated";
import './NewBusinessTrip.scss'
import {keysTabsBusinessTrip, setCondition} from "../../../../store/reducers/FormReducers/StaffStepFormBusinessTrip";
import {secretaryKeysTabsBusinessTrip, setSecretaryCondition} from '../../../../store/reducers/FormReducers/SecretaryStepFormBusinessTrip'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {TravelConditions} from "./Staff/TravelConditions/TravelConditions";
import {LivingConditions} from "./Staff/LivingConditions/LivingConditions";
import {Financing} from "./Staff/Financing/Financing";
import {ResultTable} from "./Staff/ResultTable/ResultTable";
import clsx from "clsx";
import {SecretaryDate} from "./Secretary/SecretaryDate";
import {SecretaryPlaceAndDate} from "./Secretary/SecretaryPlaceAndDate";
import {SecretaryTravelConditions} from "./Secretary/SecretaryTravelConditions";
import {SecretaryLivingConditions} from "./Secretary/SecretaryLivingConditions";
import {SecretaryFinancing} from "./Secretary/SecretaryFinancing";
import {SecretaryResultTable} from "./Secretary/SecretaryResultTable";


export const NewBusinessTrip = () => {
    const dispatch = useDispatch()
    const staffStateItem = useSelector((state: RootState) => state.StaffItemTabs)
    const styleBorderBottom = 'border-b-green-600 border-x-0 border-t-0 border-solid'
    const staffItemsTabs = [
        {
            key: keysTabsBusinessTrip.placesAndDated,
            label:
                <div className={clsx(staffStateItem.placesAndDated && styleBorderBottom)}>
                    Места и сроки командирования
                </div>,
            children: <PlacesAndDated/>
        },
        {
            key: keysTabsBusinessTrip.travelConditions,
            label:
                <div className={clsx(staffStateItem.travelConditions && styleBorderBottom)}>
                    Условия проезда
                </div>,
            children: <TravelConditions/>
        },
        {
            key: keysTabsBusinessTrip.livingConditions,
            label:
                <div className={clsx(staffStateItem.livingConditions && styleBorderBottom)}>
                    Условия проживания
                </div>,
            children: <LivingConditions/>
        },
        {
            key: keysTabsBusinessTrip.financing,
            label:
                <div className={clsx(staffStateItem.financing && styleBorderBottom)}>
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
    const staffKey = useSelector((state: RootState) => state.StaffStepFormBusinessTrip.step)

    const secretaryStateItem = useSelector((state: RootState) => state.SecretaryItemTabs)
    const secretaryKey = useSelector((state: RootState) => state.SecretaryStepFormBusinessTrip.step)
    const secretaryItemsTabs = [
        {
            key: secretaryKeysTabsBusinessTrip.staffDate,
            label:
                <div className={clsx(secretaryStateItem.staffDate && styleBorderBottom)}>
                    Данные о сотруднике
                </div>,
            children: <SecretaryDate/>
        },
        {
            key: secretaryKeysTabsBusinessTrip.placesAndDated,
            label:
                <div className={clsx(secretaryStateItem.placesAndDated && styleBorderBottom)}>
                    Места и сроки командирования
                </div>,
            children: <SecretaryPlaceAndDate/>
        },
        {
            key: secretaryKeysTabsBusinessTrip.travelConditions,
            label:
                <div className={clsx(secretaryStateItem.travelConditions && styleBorderBottom)}>
                    Условия проезда
                </div>,
            children: <SecretaryTravelConditions/>
        },
        {
            key: secretaryKeysTabsBusinessTrip.livingConditions,
            label:
                <div className={clsx(secretaryStateItem.livingConditions && styleBorderBottom)}>
                    Условия проживания
                </div>,
            children: <SecretaryLivingConditions/>
        },
        {
            key: secretaryKeysTabsBusinessTrip.financing,
            label:
                <div className={clsx(secretaryStateItem.financing && styleBorderBottom)}>
                    Финансирование
                </div>,
            children: <SecretaryFinancing/>
        },
        {
            key: secretaryKeysTabsBusinessTrip.result,
            label:
                <div>
                    Итог
                </div>,
            children: <SecretaryResultTable/>
        },
    ]

    const [role, setRole] = useState<string>('staf')
    //window.onbeforeunload = () => false

    return (
        <section className={'flex flex-col gap-5 newBusinessTrip'}>
            <span className={'text-2xl'}>Новая командировка</span>
            {
                role === 'staff'
                    ?
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
                            items={staffItemsTabs}
                            defaultActiveKey={staffKey}
                            activeKey={staffKey}
                            onTabClick={(key) => {
                                dispatch(setCondition(key))
                            }}
                        />
                    </ConfigProvider>
                    :
                    <ConfigProvider theme={{
                        components: {
                            Tabs: {
                                titleFontSize: 18,
                                itemSelectedColor: 'rgba(0, 0, 0, 0.88)',
                                itemColor: 'rgba(0, 0, 0, 0.88)',
                                cardBg: 'white',
                            }
                        }
                    }}>
                        <Tabs
                            type="card"
                            items={secretaryItemsTabs}
                            defaultActiveKey={secretaryKey}
                            activeKey={secretaryKey}
                            onTabClick={(key) => {
                                dispatch(setSecretaryCondition(key))
                            }}
                        />
                    </ConfigProvider>
            }
        </section>
    );
};

