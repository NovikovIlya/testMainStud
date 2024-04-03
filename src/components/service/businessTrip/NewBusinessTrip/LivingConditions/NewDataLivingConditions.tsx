import React from 'react';
import {AutoComplete, Col, Form} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";

export const NewDataLivingConditions = () => {
    return (
        <>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Вид транспорта'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Пункт отправления'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Пункт назначения'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
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

