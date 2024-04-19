import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {ILivingCondition, NewDataLivingConditions} from "./NewDataLivingConditions";
import {Button, Col, Form, Row} from "antd";
import {keysTabsBusinessTrip, setCondition} from "../../../../../../store/reducers/FormReducers/StaffStepFormBusinessTrip";
import {LivingCard} from "../../cardsData/LivingCard";
import {validateMessages} from "../../../../../../utils/validateMessage";
import {setLivingConditionsItemTabs} from "../../../../../../store/reducers/FormReducers/StaffItemTabsReducer";
import {isFormCompleted} from "../../utilsFunctions/isFormCompleted";
import {getAmountDay} from "../../utilsFunctions/getAmounDay";

export const LivingConditions = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    function sendDataLivingCondition(values: ILivingCondition) {
        const valuesWithSumDay = getAmountDay({values})
        dispatch(setCondition(keysTabsBusinessTrip.financing))
        console.log(valuesWithSumDay)
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

