import React from 'react';
import {AutoComplete, Col, Form, Row, Select} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";
import {RangePickerFormItem} from "../RangePickerFormItem";
import {ButtonAddData} from "../buttonAddData/buttonAddData";
import dayjs from "dayjs";

export interface INewDataLivingConditions {
    country: string
    locality: string
    livingConditions: string
    sumDay: number
    dateCheckInOut: Array<dayjs.Dayjs> | Array<null>
}

export interface ILivingCondition {
    dataLivingConditions: Array<INewDataLivingConditions>
}

export const NewDataLivingConditions = () => {

    return (
        <Form.List name={'dataLivingConditions'}
                   initialValue={[{
                       country: '',
                       dateCheckInOut: [],
                   }]}>
            {(fields, operation) => (
                <Row gutter={[16, 0]}>
                    {
                        fields.map(elem => (
                            <Row gutter={[16, 0]} className={'w-full'} key={elem.key}>
                                <Col span={12}>
                                    <Form.Item
                                        label={<LabelFormItem label={'Страна'}/>}
                                        name={[elem.name, 'country']}
                                        rules={[{
                                            required: true,
                                            max: 100,
                                        }]}
                                    >
                                        <AutoComplete
                                            options={[{value: 'test'}]}
                                            placeholder={'Ввести или выбрать'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<LabelFormItem label={'Населенный пункт'}/>}
                                        name={[elem.name, 'locality']}
                                        rules={[{
                                            required: true,
                                            max: 100,
                                        }]}
                                    >
                                        <Select
                                            options={[{value: 'test'}]}
                                            placeholder={'Выбрать'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<LabelFormItem label={'Условия проживания'}/>}
                                        name={[elem.name, 'livingConditions']}
                                        rules={[{
                                            required: true
                                        }]}
                                    >
                                        <Select
                                            options={[{value: 'Гостиница'}]}
                                            placeholder={'Ввести или выбрать'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <RangePickerFormItem
                                        elem={elem}
                                        nameField={'dateCheckInOut'}
                                        label={'Дата заезда и выезда'}/>
                                </Col>
                            </Row>
                        ))
                    }
                    <Col span={24}>
                        <ButtonAddData nameData={'данные'} addData={() => operation.add()}/>

                    </Col>
                </Row>
            )}


        </Form.List>
    );
};

