import React, {useEffect, useState} from 'react';
import {Col, DatePicker, Form, Input, InputNumber, Row, Tooltip} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import dayjs from "dayjs";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";
import {useForm} from "react-hook-form";


export interface INewOrganization {
    id: number
    innOrg: number
    nameOrg: string
    legalAddress: string
    actualAddress: string
}

export const NewOrganization = (props: INewOrganization) => {


    const [fetch, setFetch] = useState(0)
    const [test, setTest] = useState('Орг')

    useEffect(() => {
        console.log(fetch)
        setTest('Организация 11')
    }, [fetch]);

    return (
        <Row gutter={[16, 0]} className={`w-[87%]`}>
            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'ИНН организации'}/>}
                    name={'inn'}
                    rules={[{
                        required: true,
                        pattern: new RegExp('^[0-9]{10}$'),
                        message: 'ИНН содержит 10 цифр'
                    }]}>
                    <InputNumber
                        type={"number"}
                        placeholder={'Ввести'}
                        controls={false}
                        onChange={(value) => {
                            if (String(value).length === 10 && value !== null) {
                                setFetch(+value)
                            }
                        }}

                    />
                </Form.Item>
            </Col>
            <Col span={12} className={`
                relative 
                mb-[30px]`}>
                <Form.Item
                    label={<LabelFormItem label={'Организация'}/>}
                    name={'nameOrg'}
                    initialValue={props.nameOrg}
                    rules={[{
                        required: true
                    }]}>
                    <Input
                        className={`
                                text-base`}
                        placeholder={'Автоматический подбор'}
                        disabled
                    />
                </Form.Item>
                <span className={`
                    absolute 
                    bottom-[-5px] 
                    left-[7px]
                    text-[#3073D7]
                    cursor-pointer
                    `}>
                    Нет подходящей организации?
                </span>

            </Col>
            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'Юридический адрес'}/>}
                    name={'legalAddress'}
                    rules={[{
                        required: true
                    }]}
                    initialValue={props.legalAddress}>
                    <Input
                        className={`
                            text-base`}
                        placeholder={'Автоматический подбор'}
                        disabled
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'Фактический адрес'}/>}
                    name={'actualAddress'}
                    rules={[{
                        required: true
                    }]}
                >
                    <Input
                        className={`
                            text-base`}
                        placeholder={'Ввести'}
                        value={props.actualAddress}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Дата начала и окончания'}/>}>
                    <CustomRangePicker/>
                </Form.Item>
            </Col>

        </Row>

    );
};

