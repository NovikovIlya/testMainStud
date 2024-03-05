import React from 'react';
import {AutoComplete, Button, Col, ConfigProvider, Form, Input, Row, Select, Upload} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {UploadSvg} from "../../../../../assets/svg";
import {UploadFileSvg} from "../../../../../assets/svg/UploadFileSvg";

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


    // const props: UploadProps = {
    //     name: 'file',
    //     multiple: true,
    //     action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    //     onChange(info) {
    //         const { status } = info.file;
    //         if (status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //         } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    //     onDrop(e) {
    //         console.log('Dropped files', e.dataTransfer.files);
    //     },
    // };

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
                            <Input className={'text-base'} placeholder={'Ввести'}/>
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

