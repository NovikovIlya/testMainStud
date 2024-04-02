import React from 'react';
import {AutoComplete, Col, Form} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";

export interface INewDataTravelConditions {
    id: number
    typeTransport: string
    departurePoint: string
    destinationPoint: string
}

export const NewDataTravelConditions = (props: INewDataTravelConditions) => {
    return (
        <>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Вид транспорта'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                        value={props.typeTransport}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Пункт отправления'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                        value={props.departurePoint}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Пункт назначения'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                        value={props.destinationPoint}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Дата отправления и прибытия'}/>}>
                    <CustomRangePicker/>
                </Form.Item>
            </Col>

        </>
    );
};

