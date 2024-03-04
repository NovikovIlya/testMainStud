import React from 'react';
import {Form, Input, Select} from "antd";

export const EmployeeDataPageForm = () => {
    return (
        <div className={'flex flex-col gap-5'}>
            <span className={'text-xl'}>Данные о сотруднике</span>
            <Form layout={'vertical'} className={'flex gap-x-5'}>
                <Form.Item
                    label={<span className={'text-lg'}>ФИО сотрудника</span>}
                    className={'w-full'}>
                    <Input className={'text-base'}/>
                </Form.Item>

                <Form.Item
                    label={<span className={'text-lg'}>Должность</span>}
                    className={'w-full'}>
                    <Select placeholder={'Выбрать'}>
                        <Select.Option value={'test1'}>Тест 1</Select.Option>
                        <Select.Option value={'test2'}>Тест 2</Select.Option>
                        <Select.Option value={'test3'}>Тест 3</Select.Option>
                    </Select>
                </Form.Item>

                {/*<Form.Item*/}
                {/*    label={<span className={'text-lg'}>Номер телефона</span>}*/}
                {/*    className={'w-2/5'}*/}
                {/*>*/}
                {/*    <Input className={'text-base'}/>*/}
                {/*</Form.Item>*/}
            </Form>
        </div>
    );
};

