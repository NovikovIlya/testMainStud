import React from 'react';
import {AutoComplete, Button, Col, ConfigProvider, Form, Input, Row, Select, Upload} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {UploadFileSvg} from "../../../../../assets/svg/UploadFileSvg";
import clsx from 'clsx'
import InputMask from 'react-input-mask'

const optionsGoals = [
    {value: 'Цель 1'},
    {value: 'Цель 2'},
    {value: 'Цель 3'},
];

const optionsTypeDocuments = [
    {value: 'Тип документа 1'},
    {value: 'Тип документа 2'},
    {value: 'Тип документа 3'},
];

const selectOptions = [
    {value: 'test 1', name: 'Тест 1'},
    {value: 'test 2', name: 'Тест 2'},
    {value: 'test 3', name: 'Тест 3'},
]

export const EmployeeDataPageForm = () => {

    return (
        <div className={'flex flex-col gap-5'}>
            <span className={'text-xl'}>Данные о сотруднике</span>
            <Form layout={'vertical'}>
                <Row gutter={[16, 0]} className={'w-full'}>
                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'ФИО сотрудника'}/>}>
                            <Input className={'text-base'} placeholder={'Ввести'}/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Должность'}/>}>
                            <Select placeholder={'Выбрать'}>
                                {
                                    selectOptions.map(elem => (
                                        <Select.Option value={elem.value} key={elem.value}>
                                            {elem.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>

                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Номер телефона'}/>}>
                            <InputMask mask={'8 (999) 999-99-99'}
                                       placeholder={'8 (XXX) XXX-XX-XX'}
                                       className={'text-base ant-input css-dev-only-do-not-override-1wtk8bc ant-input-outlined phoneNumberMask'}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Структурное подразделение'}/>}>
                            <Input className={'text-base'} placeholder={'Ввести'}/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Категория сотрудника'}/>}>
                            <Select placeholder={'Выбрать'}>
                                {
                                    selectOptions.map(elem => (
                                        <Select.Option value={elem.value} key={elem.value}>
                                            {elem.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Цель'}/>}>
                            <AutoComplete options={optionsGoals} placeholder={'Ввести или выбрать'}/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Мероприятие'}/>}>
                            <Select placeholder={'Выбрать'}>
                                {
                                    selectOptions.map(elem => (
                                        <Select.Option value={elem.value} key={elem.value}>
                                            {elem.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Тип документа-основания'}/>}>
                            <AutoComplete options={optionsTypeDocuments} placeholder={'Ввести или выбрать'}/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Прикрепить документ'}/>}>
                            <Upload.Dragger name={'file'} multiple={true}>
                                <div className={'flex flex-col gap-2'}>
                                    <span className={'text-lg'}>Перетащите файлы или выберите на компьютере</span>
                                    <div className={'flex items-center justify-center gap-2'}>
                                        <UploadFileSvg/>
                                        <span className={'text-lg mb-0.5 text-[#3073D7]'}>Выбрать файл</span>
                                    </div>
                                </div>
                            </Upload.Dragger>
                        </Form.Item>
                    </Col>

                    <Col span={13}>
                        <Button
                            type={'primary'} shape={'round'} className={'h-10 w-20'}>
                            <span className={'text-lg'}>Далее</span>
                        </Button>
                    </Col>


                </Row>

            </Form>
        </div>
    );
};

