import {Button, DatePicker, Form, TimePicker} from 'antd'
import React from "react";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};
const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Please select time!',
        },
    ],
};
const onFinish = (fieldsValue: any) => {
    console.log(fieldsValue);
};
export const Test = () => (
    <Form onFinish={values => {
        console.log(values)
    }}>
        <Form.Item name="range-picker" label="RangePicker">
            <DatePicker.RangePicker
                placeholder={['ДД.ММ.ГГ', 'ДД.ММ.ГГ']}
                className={`text-2xl w-full`}
                format={'DD.MM.YYYY'}
            />
            <span className={`
                        absolute 
                        right-28
                        top-[5px]
                        text-[#B3B3B3]
                        `}>дней</span>
        </Form.Item>


        <Button type="primary" htmlType="submit">
            Submit
        </Button>

    </Form>
);



