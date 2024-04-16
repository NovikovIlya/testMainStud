import React from 'react';
import {AutoComplete, Button, Col, Form, Input, Row, Select} from "antd";
import {validateMessages} from "../../../../../utils/validateMessage";
import {LabelFormItem} from "../utilsComponent/labelFormItem";
import {isFormCompleted} from "../utilsFunctions/isFormCompleted";
import {useDispatch} from "react-redux";
import {setSecretaryFinancingItemTabs} from "../../../../../store/reducers/FormReducers/SecretaryItemTabsReducer";

export const SecretaryFinancing = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    return (
        <Form layout={'vertical'}
              form={form}
              onFinish={values => console.log(values)}
              validateMessages={validateMessages}
              onValuesChange={() => {
                  isFormCompleted({
                      form: form,
                      setTrue: () => dispatch(setSecretaryFinancingItemTabs(true)),
                      setFalse: () => dispatch(setSecretaryFinancingItemTabs(false)),
                      nameList: [
                          'code', 'name', 'decoding', 'currency',
                          'course', 'cost', 'countDays', 'incomeTax',
                          'amount', 'theme',
                      ]
                  })
              }}
        >
            <Row gutter={[16, 0]}>
                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Код'}/>}
                        name={'code'}
                        rules={[{
                            required: true
                        }]}>
                        <AutoComplete
                            options={[{value: 'test'}]}
                            placeholder={'Ввести или выбрать'}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Наименования'}/>}
                        name={'name'}
                        rules={[{
                            required: true
                        }]}>
                        <Select
                            options={[{value: 'test'}]}
                            placeholder={'Выбрать'}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Расшифровка'}/>}
                        name={'decoding'}
                        rules={[{
                            required: true
                        }]}>
                        <Input placeholder={'Ввести'}/>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Валюта'}/>}
                        name={'currency'}
                        rules={[{
                            required: true
                        }]}>
                        <AutoComplete
                            options={[{value: 'test'}]}
                            placeholder={'Ввести или выбрать'}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Курс'}/>}
                        name={'course'}
                        rules={[{
                            required: true
                        }]}>
                        <AutoComplete
                            options={[{value: 'test'}]}
                            placeholder={'Ввести или выбрать'}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Стоимость'}/>}
                        name={'cost'}
                        rules={[{
                            required: true
                        }]}>
                        <Input
                            placeholder={'Ввести'}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Кол-во дней'}/>}
                        name={'countDays'}
                        rules={[{
                            required: true
                        }]}>
                        <Input
                            placeholder={'Ввести'}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Под. налог'}/>}
                        name={'incomeTax'}
                        rules={[{
                            required: true
                        }]}>
                        <Input
                            placeholder={'Ввести'}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Сумма'}/>}
                        name={'amount'}
                        rules={[{
                            required: true
                        }]}>
                        <Input
                            placeholder={'Ввести'}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={<LabelFormItem label={'Тема'}/>}
                        name={'theme'}
                        rules={[{
                            required: true
                        }]}>
                        <AutoComplete
                            options={[{value: 'test'}]}
                            placeholder={'Ввести или выбрать'}
                        />
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Button type={'primary'}
                            className={'mt-5 rounded-[40px] h-[40px]'}
                            htmlType={'submit'}>
                        <span className={`text-lg`}>
                            Далее
                        </span>
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

