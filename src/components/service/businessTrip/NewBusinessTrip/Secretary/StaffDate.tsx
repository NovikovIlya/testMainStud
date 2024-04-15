import React from 'react';
import {Col, Form, Input, Row, Select, Upload} from "antd";
import {validateMessages} from "../../../../../utils/validateMessage";
import {LabelFormItem} from "../utilsComponent/labelFormItem";
import {UploadFileSvg} from "../../../../../assets/svg/UploadFileSvg";
import PhoneInput from "antd-phone-input";
import {validator} from "../../../../../utils/validPhone";


export const StaffDate = () => {
    const [form] = Form.useForm()

    return (
        <Form
            layout={'vertical'}
            form={form}
            validateMessages={validateMessages}
        >
            <Row gutter={[16, 0]} className={'w-[80%]'}>
                <Col span={13}>
                    <Form.Item
                        label={<LabelFormItem label={'ФИО сотрудника'}/>}
                        name={'fio'}>
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Номер телефона '}/>}
                               name={'numberPhone'}>
                        {/*<Input placeholder={'+7 (ХХХ) ХХХ-ХХ-ХХ'}/>*/}
                        <PhoneInput maxLength={18} />
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Структурное подразделение'}/>}
                               name={'structuralDivision'}>
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Должность'}/>}
                               name={'post'}>
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Категория сотрудника'}/>}
                               name={'categoryStaff'}>
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Мероприятие'}/>}
                               name={'event'}>
                        <Input placeholder={'Введите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Цель'}/>}
                               name={'goal'}>
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Тип документа-основания'}/>}>
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Прикрепить документ'}/>}
                               name={'file'}
                               rules={[{}]}>
                        <Upload.Dragger multiple={true} beforeUpload={() => false}>
                            <div className={`flex flex-col gap-2`}>
                                <span className={'text-lg'}>Перетащите файлы или выберите на компьютере</span>
                                <div className={`flex items-center justify-center gap-2`}>
                                    <UploadFileSvg/>
                                    <span className={`text-lg mb-0.5 text-[#3073D7]`}>
                                        Выбрать файл
                                    </span>
                                </div>
                            </div>
                        </Upload.Dragger>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    );
};

