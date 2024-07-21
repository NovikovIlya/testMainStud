import React, {useEffect, useState} from 'react';
import {Button, Col, ConfigProvider, DatePicker, Form, Input, Radio, Row} from "antd";
import {LabelFormItem} from "../../../utilsComponent/labelFormItem";
import i18n from "i18next";
import ruPicker from "antd/locale/ru_RU";
import enPicker from "antd/locale/en_US";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";


interface IFormStepTwo {
    previousStep: () => void
    setTableDisplay: () => void
}


export const FormStepTwo = ({previousStep, setTableDisplay}: IFormStepTwo) => {
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date)
    const dayJsEnd = dayjs(endDate)
    const dayJsStart = dayjs(startDate)
    const rangeStartToEnd = dayJsEnd.diff(dayJsStart, 'day')
    const dispatch = useDispatch()

    // const [dataInTable, setDataInTable] = useState<IDataFormStepTwo>({
    //     address: '',
    //     inn: '',
    //     organization: '',
    //     startDate: '',
    //     endDate: '',
    //     rangeDate: ''
    // })



    // useEffect(() => {
    //     dispatch(setRangeDate(String(rangeStartToEnd)))
    //     setDataInTable({
    //         ...dataInTable,
    //         rangeDate: String(rangeStartToEnd)
    //     })
    // }, [rangeStartToEnd])
    //
    // function addListTableData() {
    //     tableData.push(dataInTable)
    // }

    return (
        <Form layout={'vertical'}>
            <Row gutter={[16, 0]} className={'w-full'}>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Командировка в России'}/>}>
                        <Radio.Group>
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
                            // onChange={e => {
                            //     dispatch(setAddress(e.target.value))
                            //     setDataInTable({
                            //         ...dataInTable,
                            //         address: e.target.value,
                            //     })
                            // }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'ИНН организации'}/>}>
                        <Input
                            className={'text-base'}
                            placeholder={'Ввести'}
                            // onChange={(e) => {
                            //     dispatch(setInn(e.target.value))
                            //     setDataInTable({
                            //         ...dataInTable,
                            //         inn: e.target.value
                            //     })
                            // }}

                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'Организация'}/>}>
                        <Input
                            className={'text-base'}
                            placeholder={'Автоматический подбор'}
                            // onChange={(e) => {
                            //     dispatch(setOrganisation(e.target.value))
                            //     setDataInTable({
                            //         ...dataInTable,
                            //         organization: e.target.value
                            //     })
                            // }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<LabelFormItem label={'Дата начала'}/>}>
                        <ConfigProvider locale={i18n.language === 'ru' ? ruPicker : enPicker}>
                            <DatePicker
                                placeholder={'ДД.ММ.ГГ'}
                                className={'text-2xl w-full'}
                                // format={'DD.MM.YYYY'}
                                // onChange={(date) => {
                                //     setStartDate(date && date.toDate())
                                //     date && dispatch(setStartDateAction(date.format('DD.MM.YYYY')))
                                //     date && setDataInTable({
                                //         ...dataInTable,
                                //         startDate: date.format('DD.MM.YYYY')
                                //     })
                                // }}
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
                                // onChange={(date,) => {
                                //     setEndDate(date && date.toDate())
                                //     date && dispatch(setEndDateAction(date.format('DD.MM.YYYY')))
                                //     date && setDataInTable({
                                //         ...dataInTable,
                                //         endDate: date.format('DD.MM.YYYY')
                                //     })
                                // }}
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

                <Col span={3}>
                    <Button
                        type={'primary'}
                        shape={'round'}
                        className={'h-10 w-max'}
                        onClick={() => {
                            setTableDisplay()
                            // addListTableData()
                        }}
                    >
                        <span className={'text-lg'}>Сохранить</span>
                    </Button>
                </Col>
                <Col span={4}>
                    <ConfigProvider theme={{
                        components: {
                            Button: {
                                defaultColor: '#0958d9',
                                defaultBorderColor: '#0958d9',
                                defaultHoverColor: 'white',
                                defaultHoverBg: '#0958d9',
                            }
                        }
                    }}>
                        <Button
                            type={'default'}
                            shape={'round'}
                            className={'h-10 w-max'}
                            onClick={() => {
                                setTableDisplay()
                                // addListTableData()
                            }}
                        >
                            <span className={'text-lg'}>Добавить данные</span>
                        </Button>
                    </ConfigProvider>

                </Col>
            </Row>
        </Form>

    );
};

