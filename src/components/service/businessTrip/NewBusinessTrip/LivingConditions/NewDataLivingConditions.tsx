import React from 'react';
import {AutoComplete, Col, Form, Select} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";

export interface INewDataLivingConditions {
    id: number
    country: string
    locality: string
    livingConditions: string
}

export const NewDataLivingConditions = (props: INewDataLivingConditions) => {


    return (
        <>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Страна'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                        value={props.country}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Населенный пункт'}/>}>
                    <Select
                        options={[{value: 'test'}]}
                        placeholder={'Выбрать'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Условия проживания'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                        value={props.livingConditions}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Дата заезда и выезда'}/>}>
                    <CustomRangePicker/>
                </Form.Item>
            </Col>

        </>
    );
};

