import React from 'react';
import {AutoComplete, Col, Form, Select} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";

export interface INewDataTravelConditions {
    id: number
    typeTransport: string
    departurePoint: string
    destinationPoint: string
}

const typeTransportOptions = [
    {value: 'Воздушный'},
    {value: 'Железнодорожный'},
    {value: 'Морской'},
    {value: 'Речной'},
    {value: 'Автомобильный'},
]

export const NewDataTravelConditions = (props: INewDataTravelConditions) => {
    return (
        <>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Вид транспорта'}/>}
                           name={'typeTransport'}
                           initialValue={props.typeTransport}
                           rules={[{
                               required: true
                           }]}>
                    <Select options={typeTransportOptions} placeholder={'Выбрать'}/>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Пункт отправления'}/>}
                           name={'departurePoint'}
                           initialValue={props.departurePoint}
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
                    initialValue={props.destinationPoint}
                    name={'destinationPoint'}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                        value={props.destinationPoint}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'Дата отправления и прибытия'}/>}
                    name={'dateDepartureDestination'}
                    rules={[{
                        required: true
                    }]}>
                    <CustomRangePicker/>
                </Form.Item>
            </Col>

        </>
    );
};

