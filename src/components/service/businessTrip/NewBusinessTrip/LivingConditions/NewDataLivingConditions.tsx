import React from 'react';
import {AutoComplete, Col, Form, Row, Select} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";
import {RangePickerFormItem} from "../PlacesAndDated/RangePickerFormItem";
import {ButtonAddData} from "../buttonAddData/buttonAddData";

export interface INewDataLivingConditions {
    id: number
    country: string
    locality: string
    livingConditions: string
}

export const NewDataLivingConditions = () => {

    return (
        <Form.List name={'dataLivingConditions'}
                   initialValue={[{
                       country: '',
                       livingConditions: '',
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
                                    >
                                        <AutoComplete
                                            options={[{value: 'test'}]}
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

