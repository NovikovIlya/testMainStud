import React, {useEffect, useState} from 'react';
import {TitleForm} from "../titleForm/TitleForm";
import {
    AutoComplete,
    Button,
    Col,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
    Select, Space,
    Tooltip,
    Upload
} from "antd";
import {ToolTipSvg} from "../../../../../assets/svg/ToolTipSvg";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import ruPicker from "antd/locale/ru_RU";
import enPicker from "antd/locale/en_US";
import i18n from "i18next";
import {ThemeProvider} from "@material-tailwind/react";
import value = ThemeProvider.propTypes.value;
import dayjs from "dayjs";


interface IStepTwo {
    previousStep: () => void
}

export const StepTwo = ({previousStep}: IStepTwo) => {
    const toolTip = 'В блоке фиксируются место и сроки командирования работника (подотчетного лица). Если работник едет последовательно в несколько мест, то необходимо внести данные про все места командирования.'

    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date)
    const dayJsEnd = dayjs(endDate)
    const dayJsStart = dayjs(startDate)
    const rangeStartToEnd = dayJsEnd.diff(dayJsStart, 'day')



    return (
        <div className={'flex flex-col gap-5'}>
            <div className={'flex gap-2 items-center'}>
                <TitleForm title={'Места и сроки командирования'}/>
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgSpotlight: 'white',
                            colorTextLightSolid: 'black'
                        }
                    }}
                >
                    <Tooltip
                        placement={"bottomLeft"}
                        title={toolTip}
                        className={'pt-2'}

                    >
                        <span> </span>
                        <ToolTipSvg/>
                    </Tooltip>
                </ConfigProvider>
            </div>
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
                            <Input className={'text-base'} placeholder={'Ввести'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'ИНН организации'}/>}>
                            <Input className={'text-base'} placeholder={'Ввести'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Организация'}/>}>
                            <Input className={'text-base'} placeholder={'Автоматический подбор'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Дата начала'}/>}>
                            <ConfigProvider locale={i18n.language === 'ru' ? ruPicker : enPicker}>
                                <DatePicker
                                    placeholder={'ДД.ММ.ГГ'}
                                    className={'text-2xl w-full'}
                                    format={'DD.MM.YYYY'}
                                    onChange={(date) => {setStartDate(date && date.toDate())}}
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
                                    onChange={(date) => {setEndDate(date && date.toDate())}}
                                />
                            </ConfigProvider>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Продолжительность'}/>}>
                            <Input className={'text-base'}
                                   placeholder={'Автоматический подсчет'}
                                   value={!rangeStartToEnd ? 0 : rangeStartToEnd}
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
                        >
                            <span className={'text-lg'}>Сохранить</span>
                        </Button>
                    </Col>

                </Row>
            </Form>
        </div>
    );
};

