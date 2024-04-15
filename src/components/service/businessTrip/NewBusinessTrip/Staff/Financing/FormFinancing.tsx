import React from 'react';
import {AutoComplete, Col, Form, Input, Select} from "antd";
import {LabelFormItem} from "../../utilsComponent/labelFormItem";
import {CustomRangePicker} from "../../utilsComponent/customRangePicker";



export const FormFinancing = () => {

    return (
        <>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Код'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Наименования'}/>}>
                    <Select
                        options={[{value: 'test'}]}
                        placeholder={'Выбрать'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Расшифровка '}/>}>
                    <Input
                        placeholder={'Ввести'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Валюта'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Курс'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Стоимость'}/>}>
                    <Input
                        placeholder={'Ввести'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Кол-во дней'}/>}>
                    <Input
                        placeholder={'Ввести'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Под. налог'}/>}>
                    <Input
                        placeholder={'Ввести'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Сумма'}/>}>
                    <Input
                        placeholder={'Ввести'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Тема'}/>}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                    />
                </Form.Item>
            </Col>

        </>
    );
};

