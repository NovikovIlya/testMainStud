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

export const TravelConditions = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    function sendDataTravelCondition({travelConditions}: ITravelConditions) {

        for (let elem of travelConditions) {
            if (elem.dateDepartureDestination) {
                const sumDayTravel = elem.dateDepartureDestination[1]!.diff(elem.dateDepartureDestination[0], 'day') + 1
                elem.sumDay = sumDayTravel
            }
        }
        dispatch(setCondition(keysTabsBusinessTrip.livingConditions))
        dispatch(setTravelConditionsItemTabs(true))
        console.log(travelConditions)
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

