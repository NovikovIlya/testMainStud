import React from 'react';
import {Button, Col, Form, Input, Row, Select, Upload} from "antd";
import {validateMessages} from "../../../../../utils/validateMessage";
import {LabelFormItem} from "../utilsComponent/labelFormItem";
import {UploadFileSvg} from "../../../../../assets/svg/UploadFileSvg";
import PhoneInput from "antd-phone-input";
import {isFormCompleted} from "../utilsFunctions/isFormCompleted";
import {useDispatch} from "react-redux";
import {setSecretaryStaffDateItemTabs,} from "../../../../../store/reducers/FormReducers/SecretaryItemTabsReducer";

const optionsGoals = [
    {value: 'Административный визит'},
    {value: 'Выполнение научно-исследовательской работы'},
    {value: 'Повышение квалификации, переподготовка'},
    {value: 'Профориентационная работа'},
    {value: 'Сбор учебно-методического материала'},
    {value: 'Сопровождение учащихся на различные мероприятия'},
    {value: 'Стажировка (научная)'},
    {value: 'Стажировка (образовательная)'},
    {value: 'Участие в выставке (без экспоната)'},
    {value: 'Участие в выставке (с экспонатом)'},
    {value: 'Участие в конференции (без доклада)'},
    {value: 'Участие в конференции (с докладом)'},
    {value: 'Участие в мероприятиях по привлечению студентов'},
    {value: 'Участие в симпозиуме, семинаре и т.п. (без доклада)'},
    {value: 'Участие в симпозиуме, семинаре и т.п. (с докладом)'},
    {value: 'Чтение лекций, проведение семинаров, практических занятий, мастер-классов, проведение консультаций'},
];

const optionsTypeDocuments = [
    {value: 'Приказ'},
    {value: 'Приглашение'},
    {value: 'Служебная записка'},
    {value: 'План-график'},
    {value: 'Иной документ'},
];

export const SecretaryDate = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    return (
        <Form
            layout={'vertical'}
            form={form}
            validateMessages={validateMessages}
            onFinish={values => {console.log(values)}}
            onValuesChange={() => {
                isFormCompleted({
                    form: form,
                    setTrue: () => dispatch(setSecretaryStaffDateItemTabs(true)),
                    setFalse: () => dispatch(setSecretaryStaffDateItemTabs(false)),
                    nameList: [
                        'fio', 'numberPhone', 'structuralDivision',
                        'post', 'categoryStaff', 'event', 'goal', 'typeDocument', 'file'
                    ],
                })
            }}
        >
            <Row gutter={[16, 0]} className={'w-[80%]'}>
                <Col span={13}>
                    <Form.Item
                        label={<LabelFormItem label={'ФИО сотрудника'}/>}
                        name={'fio'}
                        rules={[{required: true}]}
                    >
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Номер телефона '}/>}
                               name={'numberPhone'}
                               rules={[{required: true}]}>
                        {/*<Input placeholder={'+7 (ХХХ) ХХХ-ХХ-ХХ'}/>*/}
                        <PhoneInput maxLength={18}  />
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Структурное подразделение'}/>}
                               name={'structuralDivision'}
                               rules={[{required: true}]}>
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Должность'}/>}
                               name={'post'}
                               rules={[{required: true}]}>
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Категория сотрудника'}/>}
                               name={'categoryStaff'}
                               rules={[{required: true}]}>
                        <Select options={[{value: 'test'}]} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Мероприятие'}/>}
                               name={'event'}
                               rules={[{
                                   required: true,
                                   max: 100
                               }]}>
                        <Input placeholder={'Введите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Цель'}/>}
                               name={'goal'}
                               rules={[{
                                   required: true
                               }]}
                    >
                        <Select options={optionsGoals} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Тип документа-основания'}/>}
                               name={'typeDocument'}
                               rules={[{
                                   required: true
                               }]}
                    >
                        <Select options={optionsTypeDocuments} placeholder={'Выберите'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Прикрепить документ'}/>}
                               name={'file'}
                               rules={[{
                                   required: true
                               }]}>
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
                <Col span={13}>
                    <Button type={'primary'}
                            className={'mt-5 rounded-[40px] h-[40px]'}
                            htmlType={'submit'}>
                        <span className={`text-lg`}>
                            Далее
                        </span>
                    </Button>
                </Col>
            </Row>

        </Form>
    );
};

