import React from 'react';
import {Button, Col, Form, Input, InputNumber, Radio, Row} from "antd";
import {validateMessages} from "../../../../../utils/validateMessage";
import {LabelFormItem} from "../utilsComponent/labelFormItem";
import {RangePickerFormItem} from "../utilsComponent/RangePickerFormItem";
import {useDispatch} from "react-redux";
import {isFormCompleted} from "../utilsFunctions/isFormCompleted";
import {setSecretaryPlaceAndDateItemTabs} from "../../../../../store/reducers/FormReducers/SecretaryItemTabsReducer";

export const SecretaryPlaceAndDate = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    return (
        <Form layout={'vertical'}
              validateMessages={validateMessages}
              form={form}
              onFinish={(values) => console.log(values)}
              onValuesChange={() => {
                  isFormCompleted({
                      form: form,
                      setTrue: () => dispatch(setSecretaryPlaceAndDateItemTabs(true)),
                      setFalse: () => dispatch(setSecretaryPlaceAndDateItemTabs(false)),
                      nameList: ['isRussia', 'innOrg', 'nameOrg', 'legalAddress', 'actualAddress', 'dateStartEnd']
                  })
              }}
        >
            <Row gutter={[16, 0]} className={'w-[80%]'}>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Командировка в России?'}/>}
                               name={'isRussia'}
                               rules={[{
                                   required: true
                               }]}
                    >
                        <Radio.Group>
                            <Radio value={'Да'}>Да</Radio>
                            <Radio value={'Нет'}>Нет</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item
                        label={<LabelFormItem label={'ИНН организации'}/>}
                        name={'innOrg'}
                        rules={[{
                            required: true,
                            pattern: new RegExp('^[0-9]{10}$'),
                            message: 'ИНН содержит 10 цифр'
                        }]}>
                        <InputNumber
                            type={"number"}
                            placeholder={'Ввести'}
                            controls={false}
                            onChange={(value) => {
                                if (String(value).length === 10 && value !== null) {
                                    //здесь должна быть функция поиска организации по ИНН
                                    //setFetch(+value)
                                }
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={13} className={`relative mb-[30px]`}>
                    <Form.Item
                        label={<LabelFormItem label={'Организация'}/>}
                        initialValue={'test'}
                        name={'nameOrg'}
                        rules={[{
                            required: true
                        }]}>
                        <Input
                            className={`text-base`}
                            placeholder={'Автоматический подбор'}
                            disabled
                        />
                    </Form.Item>
                    <span className={`absolute bottom-[-5px] left-[7px] text-[#3073D7] cursor-pointer`}>
                        Нет подходящей организации?
                    </span>
                </Col>
                <Col span={13}>
                    <Form.Item
                        label={<LabelFormItem label={'Юридический адрес'}/>}
                        name={'legalAddress'}
                        rules={[{
                            required: true
                        }]}
                        initialValue={'test'}>
                        <Input
                            className={`text-base`}
                            placeholder={'Автоматический подбор'}
                            disabled
                        />
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item label={<LabelFormItem label={'Фактический адрес'}/>}
                               name={'actualAddress'}
                               rules={[{
                                   required: true
                               }]}
                    >
                        <Input className={`text-base`}
                               placeholder={'Введите'}
                        />
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <RangePickerFormItem nameField={'dateStartEnd'}
                                         label={'Дата начала и окончания'}
                    />

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

