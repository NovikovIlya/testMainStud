import React, {useState} from 'react';
import {Col, DatePicker, Form, Input, Row} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import dayjs from "dayjs";

export const NewOrganization = () => {

    const [sumDay, setSumDay] = useState('0')

    function changeDatePicker(dates: Array<dayjs.Dayjs | null>) {
        if (dates) {
            setSumDay(String(dates[1]!.diff(dates[0], 'day') + 1))
        } else {
            setSumDay('0')
        }
    }

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
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Фактический адрес'}/>}>
                    <Input
                        className={`
                            text-base`}
                        placeholder={'Ввести'}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Дата начала и окончания'}/>}>
                    <DatePicker.RangePicker
                        placeholder={['ДД.ММ.ГГ', 'ДД.ММ.ГГ']}
                        className={`text-2xl w-full`}
                        format={'DD.MM.YYYY'}
                        onChange={(dates) => {
                            changeDatePicker(dates)
                        }}
                        separator={'—'}
                    />
                    <span className={`
                        absolute 
                        right-[150px] 
                        top-[5px]
                        text-[#B3B3B3]
                        `}>
                            {sumDay} дней
                        </span>
                </Form.Item>
            </Col>

        </Row>

    );
};

