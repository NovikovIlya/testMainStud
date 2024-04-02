import React, {useState} from 'react';
import {Col, DatePicker, Form, Input, Row} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import dayjs from "dayjs";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";


export interface INewOrganization {
    id: number
    innOrg: string
    nameOrg: string
    legalAddress: string
    actualAddress: string
}

export const NewOrganization = (props: INewOrganization) => {

    return (
        <Row gutter={[16, 0]} className={`w-[87%]`}>
            {/*Нужно отрефакторить*/}
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'ИНН организации'}/>}>
                    <Input
                        className={`
                            text-base
                            `}
                        placeholder={'Ввести'}
                        value={props.innOrg}
                    />
                </Form.Item>
            </Col>
            <Col span={12} className={`
                relative 
                mb-[30px]`}>
                <Form.Item
                    label={<LabelFormItem label={'Организация'}/>}>
                    <Input
                        className={`
                                text-base`}
                        placeholder={'Автоматический подбор'}
                        value={props.nameOrg}
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
                <Form.Item label={<LabelFormItem label={'Юридический адрес'}/>}>
                    <Input
                        className={`
                            text-base`}
                        placeholder={'Автоматический подбор'}
                        value={props.legalAddress}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Фактический адрес'}/>}>
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

