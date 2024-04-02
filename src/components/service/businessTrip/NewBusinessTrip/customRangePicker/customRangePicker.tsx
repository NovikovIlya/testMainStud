import React, {useState} from 'react';
import {DatePicker} from "antd";
import dayjs from "dayjs";

export const CustomRangePicker = () => {


    const [sumDay, setSumDay] = useState('0')

    function changeDatePicker(dates: Array<dayjs.Dayjs | null>) {
        if (dates) {
            setSumDay(String(dates[1]!.diff(dates[0], 'day') + 1))
        } else {
            setSumDay('0')
        }
    }

    return (
        <>
            <DatePicker.RangePicker
                placeholder={['ДД.ММ.ГГ', 'ДД.ММ.ГГ']}
                className={`text-2xl w-full`}
                format={'DD.MM.YYYY'}
                onChange={(dates) => {
                    changeDatePicker(dates)
                }}
                separator={'—'}
            />
            <span className={`
                        absolute 
                        right-28
                        top-[5px]
                        text-[#B3B3B3]
                        `}>
                {sumDay} дней
            </span>

        </>
    );
};

