import React, {useEffect, useState} from 'react';
import {Button, Col, DatePicker, Form, Input, InputNumber, Row, Tooltip} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import dayjs from "dayjs";
import {NamePath} from "rc-field-form/es/interface";
import {RangePickerFormItem} from "../RangePickerFormItem";
import {ButtonAddData} from "../buttonAddData/buttonAddData";
import {CloseOutlined} from "@ant-design/icons";


export interface INewOrganization {
    innOrg?: number
    nameOrg?: string
    legalAddress?: string
    actualAddress?: string
    dateStartEnd?: Array<dayjs.Dayjs> | Array<null>
    setFieldValue: (name: NamePath, value: any) => void;
    sumDay?: number;
}

export const NewOrganization = ({setFieldValue, ...props}: INewOrganization) => {
    const [fetch, setFetch] = useState(0)
    const [test, setTest] = useState('Орг')

    useEffect(() => {
        setTest('Организация 11')
        // form.setFieldValue('goal', 'GOAL') нужно использовать данный метод, чтобы менять значение
    }, [fetch]);

    return (
        <Form.List name={'organisations'}
                   initialValue={[{
                       innOrg: props.innOrg,
                       nameOrg: props.nameOrg,
                       legalAddress: props.legalAddress,
                       actualAddress: props.actualAddress,
                   }]}
        >
            {(fields, operation) => (
                <Row gutter={[16, 0]} className={`w-[87%]`} style={{marginLeft: '0px'}}>

                    {fields.map((elem) => (
                        <Row gutter={[16, 0]} key={elem.key}>
                            <Col span={12}>
                                <Form.Item
                                    initialValue={props.innOrg}
                                    label={<LabelFormItem label={'ИНН организации'}/>}
                                    name={[elem.name, 'innOrg']}
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
                            <Col span={12} className={`relative mb-[30px]`}>
                                <Form.Item
                                    label={<LabelFormItem label={'Организация'}/>}
                                    name={[elem.name, 'nameOrg']}
                                    initialValue={props.nameOrg}
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input
                                        className={`text-base`}
                                        placeholder={'Автоматический подбор'}
                                        disabled
                                    />
                                </Form.Item>
                                <span className={`absolute bottom-[-5px] left-[7px] text-[#3073D7] cursor-pointer`}>
                                    Нет подходящей организации?
                                </span>

                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<LabelFormItem label={'Юридический адрес'}/>}
                                    name={[elem.name, 'legalAddress']}
                                    rules={[{
                                        required: true
                                    }]}
                                    initialValue={props.legalAddress}>
                                    <Input
                                        className={`text-base`}
                                        placeholder={'Автоматический подбор'}
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<LabelFormItem label={'Фактический адрес'}/>}
                                    name={[elem.name, 'actualAddress']}
                                    rules={[{
                                        required: true
                                    }]}
                                >
                                    <Input
                                        className={`text-base`}
                                        placeholder={'Ввести'}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} className={'mr-[30px]'}>
                                <RangePickerFormItem
                                    label={'Дата начала и окончания'}
                                    nameField={'dateStartEnd'}
                                    elem={elem}
                                />
                            </Col>

                            <CloseOutlined onClick={() => {
                                operation.remove(elem.name)
                            }}/>

                        </Row>
                    ))}

                    <Col span={24}>
                        <ButtonAddData
                            nameData={'организацию'}
                            addData={() => operation.add()}
                        />
                    </Col>

                </Row>
            )}
        </Form.List>


    );
};