import React from 'react';
import {AutoComplete, Col, ConfigProvider, DatePicker, Form, Input, Radio, Row, Upload} from "antd";
import {LabelFormItem} from "../labelFormItem/labelFormItem";
import {UploadFileSvg} from "../../../../assets/svg/UploadFileSvg";
import {setInn, setOrganisation, setStartDateAction} from "../../../../store/reducers/FormReducers/FormStepTwoReducer";
import i18n from "i18next";
import ruPicker from "antd/locale/ru_RU";
import enPicker from "antd/locale/en_US";

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
    {value: 'Тип документа 1'},
    {value: 'Тип документа 2'},
    {value: 'Тип документа 3'},
];

export const PlacesAndDated = () => {
    return (
        <Form layout={'vertical'}>
            <Row
                gutter={[16, 0]}
                className={`
                w-[80%]
                `}
            >
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Цель'}/>}>
                        <AutoComplete options={optionsGoals} placeholder={'Ввести или выбрать'}/>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Мероприятие'}/>}>
                        <Input className={'text-base'} placeholder={'Ввести'}/>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Тип документа-основания'}/>}>
                        <AutoComplete options={optionsTypeDocuments} placeholder={'Ввести или выбрать'}/>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Прикрепить документ'}/>}>
                        <Upload.Dragger name={'file'} multiple={true}>
                            <div className={`
                            flex 
                            flex-col 
                            gap-2`}>
                                <span className={'text-lg'}>Перетащите файлы или выберите на компьютере</span>
                                <div className={`
                                flex 
                                items-center 
                                justify-center 
                                gap-2`}>
                                    <UploadFileSvg/>
                                    <span className={`
                                    text-lg 
                                    mb-0.5 
                                    text-[#3073D7]`}>Выбрать файл</span>
                                </div>
                            </div>
                        </Upload.Dragger>
                    </Form.Item>
                </Col>

                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Командировка в России'}/>}>
                        <Radio.Group>
                            <Radio value={'Да'}>Да</Radio>
                            <Radio value={'Нет'}>Нет</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>


            </Row>

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
                        <ConfigProvider locale={i18n.language === 'ru' ? ruPicker : enPicker}>
                            <DatePicker.RangePicker
                                placeholder={['ДД.ММ.ГГ', 'ДД.ММ.ГГ']}
                                className={'text-2xl w-full'}
                                format={'DD.MM.YYYY'}
                                onChange={(dates) => {
                                    console.log(
                                        // dates[0]?.diff(dates[1], 'day')
                                        dates && dates[1]?.diff(dates[0], 'day')
                                    )}}
                            />
                        </ConfigProvider>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    );
};

