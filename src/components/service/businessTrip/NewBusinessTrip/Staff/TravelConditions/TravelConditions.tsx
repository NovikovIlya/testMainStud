import React, {useState} from 'react';
import {Button, Col, Form, Row} from "antd";
import {ButtonAddData} from "../../utilsComponent/buttonAddData";
import {useDispatch} from "react-redux";
import {keysTabsBusinessTrip, setCondition} from "../../../../../../store/reducers/FormReducers/StaffStepFormBusinessTrip";
import {INewDataTravelConditions, ITravelConditions, NewDataTravelConditions} from "./NewDataTravelConditions";
import {TravelCard} from "../../cardsData/TravelCard";
import {validateMessages} from "../../../../../../utils/validateMessage";
import {setTravelConditionsItemTabs} from "../../../../../../store/reducers/FormReducers/StaffItemTabsReducer";
import {isFormCompleted} from "../../utilsFunctions/isFormCompleted";
import {getAmountDay} from "../../utilsFunctions/getAmounDay";

export const TravelConditions = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    function sendDataTravelCondition(values: ITravelConditions) {
        const valuesWithSumDay = getAmountDay({values})
        dispatch(setCondition(keysTabsBusinessTrip.livingConditions))
        console.log(valuesWithSumDay)
    }

    return (
        <Form layout={'vertical'}
              form={form}
              validateMessages={validateMessages}
              onFinish={values => sendDataTravelCondition(values)}
              onValuesChange={() => {
                  isFormCompleted({
                      form: form,
                      setTrue: () => dispatch(setTravelConditionsItemTabs(true)),
                      setFalse: () => dispatch(setTravelConditionsItemTabs(false)),
                      nameList: ['travelConditions'],
                  })
              }}
        >
            <Row gutter={[16, 0]} className={`w-full`} style={{marginLeft: '0px'}}>
                <Col span={16}>
                    <NewDataTravelConditions/>
                </Col>
                <Col span={8}>
                    <TravelCard/>
                </Col>

            </Row>
            <Col span={24}>
                <div className={`flex gap-5`}>
                    <Button type={'default'} shape={'round'} className={`h-10 w-max border-[#3073D7]`} onClick={() => {
                        dispatch(setCondition(keysTabsBusinessTrip.placesAndDated))
                    }}>
                        <span className={`text-lg text-[#3073D7]`}>Назад</span>
                    </Button>

                    <Button type={'primary'} shape={'round'} className={'h-10 w-max'} htmlType={'submit'}>
                        <span className={'text-lg'}>Далее</span>
                    </Button>
                </div>
            </Col>

        </Form>
    );
};

