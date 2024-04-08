import React, {useState} from 'react';
import {WrapperForConditionsTabs} from "../WrapperForConditionsTabs/WrapperForConditionsTabs";
import {ColSpan16RowGutter16} from "../WrapperForConditionsTabs/ColSpan16RowGutter16";
import {ColSpan8} from "../WrapperForConditionsTabs/ColSpan8";
import {useDispatch} from "react-redux";
import {INewDataTravelConditions} from "../TravelConditions/NewDataTravelConditions";
import {INewDataLivingConditions, NewDataLivingConditions} from "./NewDataLivingConditions";
import {Button, Col} from "antd";
import {ButtonAddData} from "../buttonAddData/buttonAddData";
import {keysTabsBusinessTrip, setCondition} from "../../../../../store/reducers/FormReducers/StepFormBusinessTrip";
import {LivingCard} from "../cardsData/LivingCard";

export const LivingConditions = () => {

    const dispatch = useDispatch()

    const [listLivingCondition, setListLivingCondition] = useState<INewDataLivingConditions[]>([
        {id: 1, country: '', locality: '', livingConditions: ''},
    ])

    function addDataLivingCondition() {
        setListLivingCondition([
            ...listLivingCondition,
            {
                id: listLivingCondition.length + 1,
                country: '',
                locality: '',
                livingConditions: '',
            }
        ])
    }

    return (
        <WrapperForConditionsTabs>
            <ColSpan16RowGutter16>
                {
                    listLivingCondition.map((elem) => (
                        <NewDataLivingConditions
                            id={elem.id}
                            key={elem.id}
                            country={elem.country}
                            locality={elem.locality}
                            livingConditions={elem.livingConditions}
                        />
                    ))
                }

                <Col span={13}>
                    <ButtonAddData addData={addDataLivingCondition} nameData={'данные'}/>
                </Col>

                <Col span={12}>
                    <div className={`flex gap-5 mt-5`}>
                        <Button
                            type={'default'}
                            shape={'round'}
                            className={`h-10 w-max 
                                    border-[#3073D7]`}
                            onClick={() => {
                                dispatch(setCondition(keysTabsBusinessTrip.travelConditions))
                            }}>
                            <span className={`text-lg 
                                   text-[#3073D7]`}>
                                Назад
                            </span>
                        </Button>

                        <Button
                            type={'primary'}
                            shape={'round'}
                            className={'h-10 w-max'}
                            onClick={() => {
                                dispatch(setCondition(keysTabsBusinessTrip.financing))
                            }}
                        >
                            <span className={'text-lg'}>Далее</span>
                        </Button>
                    </div>
                </Col>

            </ColSpan16RowGutter16>

            <ColSpan8>
                <LivingCard/>
            </ColSpan8>
        </WrapperForConditionsTabs>
    );
};

