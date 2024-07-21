import React from 'react';
import {AutoComplete, Button, Col, Form, InputNumber, Row, Select} from "antd";
import {validateMessages} from "../../../../../utils/validateMessage";
import {LabelFormItem} from "../utilsComponent/labelFormItem";
import {RangePickerFormItem} from "../utilsComponent/RangePickerFormItem";
import {isFormCompleted} from "../utilsFunctions/isFormCompleted";
import {useDispatch} from "react-redux";
import {
    setSecretaryTravelConditionsItemTabs
} from "../../../../../store/reducers/FormReducers/SecretaryItemTabsReducer";

const typeTransportOptions = [
    {value: 'Воздушный'},
    {value: 'Железнодорожный'},
    {value: 'Морской'},
    {value: 'Речной'},
    {value: 'Автомобильный'},
]


export const SecretaryTravelConditions = () => {
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
                      setTrue: () => dispatch(setSecretaryTravelConditionsItemTabs(true)),
                      setFalse: () => dispatch(setSecretaryTravelConditionsItemTabs(false)),
                      nameList: [
                          'typeTransport', 'departurePoint', 'destinationPoint', 'cost', 'dateDepartureDestination'
                      ]
                  })
              }}
        >
            <Row gutter={[16, 0]} className={'w-[80%]'}>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Вид транспорта'}/>}
                               name={'typeTransport'}
                               rules={[{required: true}]}
                    >
                        <Select options={typeTransportOptions} placeholder={'Выбрать'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Пункт отправления'}/>}
                               name={'departurePoint'}
                               rules={[{
                                   required: true,
                                   max: 100
                               }]}>
                        <AutoComplete options={[{value: 'test'}]} placeholder={'Ввести или выбрать'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Пункт назначения'}/>}
                               name={'destinationPoint'}
                               rules={[{
                                   required: true,
                                   max: 100
                               }]}>
                        <AutoComplete options={[{value: 'test'}]} placeholder={'Ввести или выбрать'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Стоимость'}/>}
                               name={'cost'}
                               rules={[{
                                   required: true
                               }]}>
                        <InputNumber type={'number'} controls={false} placeholder={'Ввести'}/>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <RangePickerFormItem nameField={'dateDepartureDestination'}
                                         label={'Дата отправления и прибытия'}/>
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

