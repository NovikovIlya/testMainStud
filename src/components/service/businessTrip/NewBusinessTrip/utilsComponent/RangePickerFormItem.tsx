import React, {useEffect, useState} from 'react';
import {DatePicker, Form, FormListFieldData} from "antd";
import {LabelFormItem} from "./labelFormItem";
import {SumDay} from "./SumDay";
import dayjs from "dayjs";

interface IRangePickerFormItem {
    elem: FormListFieldData
    nameField: string
    label: string
}

// Данный код нужно было изолировать в отдельный компонент,
// чтобы состояние sumDay было уникальным для каждого RangePicker


export const RangePickerFormItem = ({elem, label, nameField}: IRangePickerFormItem) => {
    const [sumDay, setSumDay] = useState(0)
    function changeSumDay(dates: Array<dayjs.Dayjs | null>) {
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
                label={<LabelFormItem label={label}/>}
                name={[elem.name, nameField]}
                rules={[{
                    type: 'array',
                    required: true,
                }]}

            >
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
            <SumDay>{sumDay} дней</SumDay>

        </>
    );
};

