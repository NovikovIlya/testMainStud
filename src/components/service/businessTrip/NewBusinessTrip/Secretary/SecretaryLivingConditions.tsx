import React from 'react';
import {AutoComplete, Button, Col, Form, InputNumber, Row, Select} from "antd";
import {validateMessages} from "../../../../../utils/validateMessage";
import {LabelFormItem} from "../utilsComponent/labelFormItem";
import {RangePickerFormItem} from "../utilsComponent/RangePickerFormItem";
import {isFormCompleted} from "../utilsFunctions/isFormCompleted";
import {useDispatch} from "react-redux";
import {
    setSecretaryLivingConditionsItemTabs
} from "../../../../../store/reducers/FormReducers/SecretaryItemTabsReducer";

export const SecretaryLivingConditions = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    return (
        <Form layout={'vertical'}
              form={form}
              validateMessages={validateMessages}
              onFinish={values => console.log(values)}
              onValuesChange={() => {
                  isFormCompleted({
                      form: form,
                      setTrue: () => dispatch(setSecretaryLivingConditionsItemTabs(true)),
                      setFalse: () => dispatch(setSecretaryLivingConditionsItemTabs(false)),
                      nameList: [
                          'country', 'locality', 'livingConditions', 'costPerDay', 'dateCheckInOut',
                      ]
                  })
              }}
        >
            <Row gutter={[16, 0]} className={'w-[80%]'}>
                <Col span={13}>
                    <Form.Item
                        label={<LabelFormItem label={'Страна'}/>}
                        name={'country'}
                        rules={[{
                            required: true,
                            max: 100
                        }]}>
                        <AutoComplete options={[{value: 'test'}]} placeholder={'Ввести или выбрать'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item
                        label={<LabelFormItem label={'Населенный пункт'}/>}
                        name={'locality'}
                        rules={[{
                            required: true,
                            max: 100
                        }]}>
                        <AutoComplete options={[{value: 'test'}]} placeholder={'Ввести или выбрать'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item
                        label={<LabelFormItem label={'Условия проживания'}/>}
                        name={'livingConditions'}
                        rules={[{
                            required: true
                        }]}>
                        <Select options={[{value: 'Гостиница '}]} placeholder={'Выбрать'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item
                        label={<LabelFormItem label={'Стоимость за сутки'}/>}
                        name={'costPerDay'}
                        rules={[{
                            required: true
                        }]}
                    >
                        <InputNumber controls={false} type={'number'} placeholder={'Ввести'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <RangePickerFormItem nameField={'dateCheckInOut'} label={'Дата заезда и выезда'}/>
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

