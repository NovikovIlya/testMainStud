import React, {useState} from 'react';
import {AutoComplete, Col, DatePicker, Form, Select} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {CustomRangePicker} from "../customRangePicker/customRangePicker";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {setNewSumDay} from "../../../../../store/reducers/FormReducers/SumDayReducer";
import {SumDay} from "../SumDay";

export interface INewDataTravelConditions {
    id: number
    typeTransport: string
    departurePoint: string
    destinationPoint: string
    date: Array<dayjs.Dayjs> | Array<null>
}

const typeTransportOptions = [
    {value: 'Воздушный'},
    {value: 'Железнодорожный'},
    {value: 'Морской'},
    {value: 'Речной'},
    {value: 'Автомобильный'},
]

export const NewDataTravelConditions = (props: INewDataTravelConditions) => {

    const [sumDay, setSumDay] = useState(0)
    const dispatch = useDispatch()

    function changeSumDay(dates: Array<dayjs.Dayjs | null>) {
        if (dates) {
            const sumDay = dates[1]!.diff(dates[0], 'day') + 1
            setSumDay(sumDay)
            dispatch(setNewSumDay(sumDay))
        } else {
            setSumDay(0)
        }
    }

    return (
        <>
            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Вид транспорта'}/>}
                           name={'typeTransport'}
                           initialValue={props.typeTransport}
                           rules={[{
                               required: true
                           }]}>
                    <Select options={typeTransportOptions} placeholder={'Выбрать'}/>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label={<LabelFormItem label={'Пункт отправления'}/>}
                           name={'departurePoint'}
                           initialValue={props.departurePoint}
                           rules={[{
                               required: true,
                               max: 100
                           }]}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'Пункт назначения'}/>}
                    rules={[{
                        required: true,
                        max: 100
                    }]}
                    initialValue={props.destinationPoint}
                    name={'destinationPoint'}>
                    <AutoComplete
                        options={[{value: 'test'}]}
                        placeholder={'Ввести или выбрать'}
                        value={props.destinationPoint}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label={<LabelFormItem label={'Дата отправления и прибытия'}/>}
                    name={'dateDepartureDestination'}
                    rules={[{
                        required: true,
                        type: 'array',
                    }]}
                    initialValue={props.date}>
                    <DatePicker.RangePicker
                        placeholder={['ДД.ММ.ГГ', 'ДД.ММ.ГГ']}
                        className={`text-2xl w-full`}
                        format={'DD.MM.YYYY'}
                        onChange={(dates) => {
                            changeSumDay(dates)
                        }}
                        separator={'—'}
                    />
                </Form.Item>
                <SumDay>
                    {sumDay} дней
                </SumDay>
            </Col>

        </>
    );
};

