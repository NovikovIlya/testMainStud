import React, {useState} from 'react';
import {WrapperForConditionsTabs} from "../WrapperForConditionsTabs/WrapperForConditionsTabs";
import {ColSpan16RowGutter16} from "../WrapperForConditionsTabs/ColSpan16RowGutter16";
import {ColSpan8} from "../WrapperForConditionsTabs/ColSpan8";
import {useDispatch} from "react-redux";
import {INewDataTravelConditions, NewDataTravelConditions} from "../TravelConditions/NewDataTravelConditions";
import {NewDataLivingConditions} from "./NewDataLivingConditions";
import {Button, Col, Form, Row} from "antd";
import {ButtonAddData} from "../buttonAddData/buttonAddData";
import {keysTabsBusinessTrip, setCondition} from "../../../../../store/reducers/FormReducers/StepFormBusinessTrip";
import {LivingCard} from "../cardsData/LivingCard";
import {validateMessages} from "../../../../../utils/validateMessage";
import {TravelCard} from "../cardsData/TravelCard";

export const LivingConditions = () => {

    const dispatch = useDispatch()


    return (
        <Form layout={'vertical'} validateMessages={validateMessages}>
            <Row gutter={[16, 0]} className={`w-full`} style={{marginLeft: '0px'}}>
                <Col span={16}>
                    <NewDataLivingConditions/>
                </Col>
                <Col span={8}>
                    <LivingCard/>
                </Col>

                <Col span={24}>
                    <div className={`flex gap-5 mt-5`}>
                        <Button type={'default'} shape={'round'} className={`h-10 w-max border-[#3073D7]`}
                                onClick={() => {
                                    dispatch(setCondition(keysTabsBusinessTrip.travelConditions))
                                }}>
                            <span className={`text-lg text-[#3073D7]`}> Назад </span>
                        </Button>

                        <Button type={'primary'} shape={'round'} className={'h-10 w-max'}
                                onClick={() => {
                                    dispatch(setCondition(keysTabsBusinessTrip.financing))
                                }}>
                            <span className={'text-lg'}>Далее</span>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};

