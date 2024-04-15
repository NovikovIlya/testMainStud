import React, {useState} from 'react';
import {WrapperForConditionsTabs} from "../WrapperForConditionsTabs/WrapperForConditionsTabs";
import {ColSpan16RowGutter16} from "../WrapperForConditionsTabs/ColSpan16RowGutter16";
import {ColSpan8} from "../WrapperForConditionsTabs/ColSpan8";
import {useDispatch} from "react-redux";
import {
    INewDataTravelConditions,
    ITravelConditions,
    NewDataTravelConditions
} from "../TravelConditions/NewDataTravelConditions";
import {ILivingCondition, NewDataLivingConditions} from "./NewDataLivingConditions";
import {Button, Col, Form, Row} from "antd";
import {ButtonAddData} from "../buttonAddData/buttonAddData";
import {keysTabsBusinessTrip, setCondition} from "../../../../../store/reducers/FormReducers/StepFormBusinessTrip";
import {LivingCard} from "../cardsData/LivingCard";
import {validateMessages} from "../../../../../utils/validateMessage";
import {TravelCard} from "../cardsData/TravelCard";
import {setLivingConditionsItemTabs} from "../../../../../store/reducers/FormReducers/ItemTabs";
import {isFormCompleted} from "../utils/isFormCompleted";

export const LivingConditions = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    function sendDataLivingCondition({dataLivingConditions}: ILivingCondition) {

        for (let elem of dataLivingConditions) {
            if (elem.dateCheckInOut) {
                const sumDayLiving = elem.dateCheckInOut[1]!.diff(elem.dateCheckInOut[0], 'day') + 1
                elem.sumDay = sumDayLiving
            }
        }
        dispatch(setCondition(keysTabsBusinessTrip.financing))
        dispatch(setLivingConditionsItemTabs(true))
        console.log(dataLivingConditions)
    }

    return (
        <Form layout={'vertical'}
              form={form}
              validateMessages={validateMessages}
              onFinish={values => {sendDataLivingCondition(values)}}
              onValuesChange={() => {
                  isFormCompleted({
                      form: form,
                      setTrue: () => dispatch(setLivingConditionsItemTabs(true)),
                      setFalse: () => dispatch(setLivingConditionsItemTabs(false)),
                      nameList: ['dataLivingConditions']
                  })
              }}
        >
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

                        <Button type={'primary'}
                                htmlType={'submit'}
                                shape={'round'}
                                className={'h-10 w-max'}
                                onClick={() => {
                                    //dispatch(setCondition(keysTabsBusinessTrip.financing))
                                }}>
                            <span className={'text-lg'}>Далее</span>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};

