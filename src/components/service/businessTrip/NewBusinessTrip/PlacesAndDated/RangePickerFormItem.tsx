import React, {useState} from 'react';
import {DatePicker, Form, FormListFieldData} from "antd";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import {SumDay} from "../SumDay";
import dayjs from "dayjs";

interface IRangePickerFormItem {
    elem: FormListFieldData
    date: Array<dayjs.Dayjs> | Array<null>
}


export const RangePickerFormItem = ({elem, date}: IRangePickerFormItem) => {

    const [sumDay, setSumDay] = useState(0)
    function changeSumDay(dates: Array<dayjs.Dayjs | null>, elemName: number) {
        if (dates) {
            const sumDay = dates[1]!.diff(dates[0], 'day') + 1
            setSumDay(sumDay)
        } else {
            setSumDay(0)
        }
    }

    return (
        <>
            <Form.Item
                label={<LabelFormItem label={'Дата начала и окончания'}/>}
                name={[elem.name, 'date']}
                rules={[{
                    type: 'array',
                    required: true,
                }]}
                initialValue={date}>
                <DatePicker.RangePicker
                    placeholder={['ДД.ММ.ГГ', 'ДД.ММ.ГГ']}
                    className={`text-2xl w-full`}
                    format={'DD.MM.YYYY'}
                    onChange={(dates) => {
                        changeSumDay(dates, elem.name)
                    }}
                    separator={'—'}
                />
            </Form.Item>
            <SumDay>{sumDay} дней</SumDay>

        </>
    );
};

