import React, {useEffect, useState} from 'react';
import {Button, Col, ConfigProvider, DatePicker, Form, Input, Radio, Row} from "antd";
import {LabelFormItem} from "../../../labelFormItem/labelFormItem";
import i18n from "i18next";
import ruPicker from "antd/locale/ru_RU";
import enPicker from "antd/locale/en_US";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {
    setAddress,
    setAtRussia, setEndDateAction,
    setInn, setOrganisation,
    setRangeDate, setStartDateAction
} from "../../../../../../store/reducers/FormReducers/FormStepTwoReducer";
import {RootState} from "../../../../../../store";

interface IFormStepTwo {
    previousStep: () => void
    setTableDisplay: () => void
}

// interface IDataFormStepTwo {
//     atRussia: string,
//     address: string,
//     inn: string
//     organisation: string
//     startDate: string | string[],
//     endDate: string | string[],
//     rangeDate: string
// }

export const FormStepTwo = ({previousStep, setTableDisplay}: IFormStepTwo) => {
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date)
    const dayJsEnd = dayjs(endDate)
    const dayJsStart = dayjs(startDate)
    const rangeStartToEnd = dayJsEnd.diff(dayJsStart, 'day')
    const dispatch = useDispatch()

    const savedData = {
        atRussia: useSelector((state: RootState) => state.FormStepTwo.atRussia),
        address: useSelector((state: RootState) => state.FormStepTwo.address),
        inn: useSelector((state: RootState) => state.FormStepTwo.inn),
        organisation: useSelector((state: RootState) => state.FormStepTwo.organisation),
        startDate: useSelector((state: RootState) => state.FormStepTwo.startDate),
        endDate: useSelector((state: RootState) => state.FormStepTwo.endDate),
        rangeDate: useSelector((state: RootState) => state.FormStepTwo.rangeDate),
    }

    useEffect(() => {
        dispatch(setRangeDate(String(rangeStartToEnd)))
    }, [rangeStartToEnd])


    return (
        <Form layout={'vertical'}>
            <Row gutter={[16, 0]} className={'w-full'}>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Командировка в России'}/>}>
                        <Radio.Group
                            onChange={e => dispatch(setAtRussia(e.target.value))}
                            value={savedData.atRussia}
                        >
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
                            onChange={e => dispatch(setAddress(e.target.value))}
                            value={savedData.address}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'ИНН организации'}/>}>
                        <Input
                            className={'text-base'}
                            placeholder={'Ввести'}
                            onChange={(e) => dispatch(setInn(e.target.value))}
                            value={savedData.inn}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'Организация'}/>}>
                        <Input
                            className={'text-base'}
                            placeholder={'Автоматический подбор'}
                            onChange={(e) => dispatch(setOrganisation(e.target.value))}
                            value={savedData.organisation}
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
                                onChange={(date) => {
                                    setStartDate(date && date.toDate())
                                    date && dispatch(setStartDateAction(date?.format('DD.MM.YYYY')))
                                }}
                                value={
                                    savedData.startDate === '' ? null : dayjs(savedData.startDate, "DD.MM.YYYY")
                                }

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
                                onChange={(date,) => {
                                    setEndDate(date && date.toDate())
                                    date && dispatch(setEndDateAction(date.format('DD.MM.YYYY')))
                                }}
                                value={
                                    savedData.endDate === '' ? null : dayjs(savedData.endDate, "DD.MM.YYYY")
                                }

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

