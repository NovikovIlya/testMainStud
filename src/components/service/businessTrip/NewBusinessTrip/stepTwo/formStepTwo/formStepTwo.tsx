import React, {useEffect, useState} from 'react';
import {Button, Col, ConfigProvider, DatePicker, Form, Input, Radio, Row} from "antd";
import {LabelFormItem} from "../../../labelFormItem/labelFormItem";
import i18n from "i18next";
import ruPicker from "antd/locale/ru_RU";
import enPicker from "antd/locale/en_US";
import dayjs from "dayjs";
import {ThemeProvider} from "@material-tailwind/react";
import value = ThemeProvider.propTypes.value;

interface IFormStepTwo {
    previousStep: () => void
    setTableDisplay: () => void
}

interface IDataFormStepTwo {
    atRussia: string,
    address: string,
    inn: string
    organisation: string
    startDate: string | string[],
    endDate: string | string[],
    rangeDate: string
}

export const FormStepTwo = ({previousStep, setTableDisplay}: IFormStepTwo) => {
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date)
    const dayJsEnd = dayjs(endDate)
    const dayJsStart = dayjs(startDate)
    const rangeStartToEnd = dayJsEnd.diff(dayJsStart, 'day')

    const [test, setTest] = useState<IDataFormStepTwo>({
        atRussia: '',
        address: '',
        inn: '',
        organisation: '',
        startDate: '',
        endDate: '',
        rangeDate: ''
    })

    console.log(test)

    useEffect(() => {
        console.log('asdf')
        setTest({
            ...test,
            rangeDate: String(rangeStartToEnd)
        })
    }, [rangeStartToEnd])


    return (
        <Form layout={'vertical'}>
            <Row gutter={[16, 0]} className={'w-full'}>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Командировка в России'}/>}>
                        <Radio.Group onChange={e => setTest({
                            ...test,
                            atRussia: e.target.value
                        })}>
                            <Radio value={'Да'}>Да</Radio>
                            <Radio value={'Нет'}>Нет</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'Адрес'}/>}>
                        <Input
                            className={'text-base'}
                            placeholder={'Ввести'}
                            onChange={event => setTest({
                                ...test,
                                address: event.target.value
                            })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'ИНН организации'}/>}>
                        <Input
                            className={'text-base'}
                            placeholder={'Ввести'}
                            onChange={(e) => {
                                setTest({
                                    ...test,
                                    inn: e.target.value,
                                })
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'Организация'}/>}>
                        <Input
                            className={'text-base'}
                            placeholder={'Автоматический подбор'}
                            onChange={(e) => {
                                setTest({
                                    ...test,
                                    organisation: e.target.value
                                })
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'Дата начала'}/>}>
                        <ConfigProvider locale={i18n.language === 'ru' ? ruPicker : enPicker}>
                            <DatePicker
                                placeholder={'ДД.ММ.ГГ'}
                                className={'text-2xl w-full'}
                                format={'DD.MM.YYYY'}
                                onChange={(date, dates) => {
                                    setStartDate(date && date.toDate())
                                    setTest({
                                        ...test,
                                        startDate: date && dates
                                    })
                                }}
                            />
                        </ConfigProvider>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'Дата окончания'}/>}>
                        <ConfigProvider locale={i18n.language === 'ru' ? ruPicker : enPicker}>
                            <DatePicker
                                placeholder={'ДД.ММ.ГГ'}
                                className={'text-2xl w-full'}
                                format={'DD.MM.YYYY'}
                                onChange={(date, dates) => {
                                    setEndDate(date && date.toDate())
                                    setTest({
                                        ...test,
                                        endDate: date && dates,
                                        rangeDate: String(rangeStartToEnd)
                                    })
                                }}
                            />
                        </ConfigProvider>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'Продолжительность'}/>}>
                        <Input className={'text-base'}
                               placeholder={'Автоматический подсчет'}
                               value={!rangeStartToEnd ? '' : rangeStartToEnd}
                        />
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <Button
                        type={'primary'}
                        shape={'round'}
                        className={'h-10 w-max'}
                        onClick={previousStep}
                    >
                        <span className={'text-lg'}>Назад</span>
                    </Button>
                </Col>

                <Col span={4}>
                    <Button
                        type={'primary'}
                        shape={'round'}
                        className={'h-10 w-max'}
                        onClick={setTableDisplay}
                    >
                        <span className={'text-lg'}>Сохранить</span>
                    </Button>
                </Col>
            </Row>
        </Form>

    );
};

