import React, {useState} from 'react';
import {AutoComplete, Col, DatePicker, Form, Row, Select} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {setNewSumDay} from "../../../../../store/reducers/FormReducers/SumDayReducer";
import {SumDay} from "../SumDay";
import {ButtonAddData} from "../buttonAddData/buttonAddData";
import {RangePickerFormItem} from "../PlacesAndDated/RangePickerFormItem";

export interface INewDataTravelConditions {
    typeTransport: string
    departurePoint: string
    destinationPoint: string
    dateDepartureDestination: Array<dayjs.Dayjs> | Array<null>
    sumDay: number
}

export interface ITravelConditions {
    travelConditions: Array<INewDataTravelConditions>

}

const typeTransportOptions = [
    {value: 'Воздушный'},
    {value: 'Железнодорожный'},
    {value: 'Морской'},
    {value: 'Речной'},
    {value: 'Автомобильный'},
]

export const NewDataTravelConditions = () => {

    return (
        <Form.List name={'travelConditions'}
                   initialValue={[{
                       departurePoint: '',
                       destinationPoint: '',
                       dateDepartureDestination: []
                   }]}
        >
            {(fields, operation) => (
                <Row gutter={[16, 0]} className={`w-full`}>

                    {
                        fields.map((elem) => (
                            <Row gutter={[16, 0]} key={elem.key}>
                                <Col span={12}>
                                    <Form.Item label={<LabelFormItem label={'Вид транспорта'}/>}
                                               name={[elem.name, 'typeTransport']}
                                               rules={[{
                                                   required: true
                                               }]}>
                                        <Select options={typeTransportOptions} placeholder={'Выбрать'}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={<LabelFormItem label={'Пункт отправления'}/>}
                                               name={[elem.name, 'departurePoint']}
                                               rules={[{
                                                   required: true,
                                                   max: 100
                                               }]}>
                                        <AutoComplete
                                            options={[{value: 'test'}]}
                                            placeholder={'Ввести или выбрать'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<LabelFormItem label={'Пункт назначения'}/>}
                                        rules={[{
                                            required: true,
                                            max: 100
                                        }]}
                                        name={[elem.name, 'destinationPoint']}>
                                        <AutoComplete
                                            options={[{value: 'test'}]}
                                            placeholder={'Ввести или выбрать'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <RangePickerFormItem
                                        elem={elem}
                                        nameField={'dateDepartureDestination'}
                                        label={'Дата отправления и прибытия'}/>
                                </Col>
                            </Row>
                        ))
                    }
                    <Col span={24}>
                        <ButtonAddData addData={() => {
                            operation.add()
                        }} nameData={'данные'}/>
                    </Col>
                </Row>
            )}


            {/*<Col span={13}>*/}
            {/*    <ButtonAddData addData={() => {}} nameData={'данные'}/>*/}
            {/*</Col>*/}

        </Form.List>
    );
};

