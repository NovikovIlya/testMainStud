import React from 'react';
import {TitleForm} from "../titleForm/TitleForm";
import {
    AutoComplete,
    Button,
    Col,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
    Select, Space,
    Tooltip,
    Upload
} from "antd";
import {ToolTipSvg} from "../../../../../assets/svg/ToolTipSvg";
import {LabelFormItem} from "../../labelFormItem/labelFormItem";
import InputMask from "react-input-mask";
import {UploadFileSvg} from "../../../../../assets/svg/UploadFileSvg";

const toolTip = 'В блоке фиксируются место и сроки командирования работника (подотчетного лица). Если работник едет последовательно в несколько мест, то необходимо внести данные про все места командирования.'

export const StepTwo = () => {
    return (
        <div className={'flex flex-col gap-5'}>
            <div className={'flex gap-2 items-center'}>
                <TitleForm title={'Места и сроки командирования'}/>
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgSpotlight: 'white',
                            colorTextLightSolid: 'black'
                        }
                    }}
                >
                    <Tooltip
                        placement={"bottomLeft"}
                        title={toolTip}
                        className={'pt-2'}

                    >
                        <span> </span>
                        <ToolTipSvg/>
                    </Tooltip>
                </ConfigProvider>
            </div>
            <Form layout={'vertical'}>
                <Row gutter={[16, 0]} className={'w-full'}>
                    <Col span={13}>
                        <Form.Item label={<LabelFormItem label={'Командировка в России'}/>}>
                            <Radio.Group>
                                <Radio value={'Да'}>Да</Radio>
                                <Radio value={'Нет'}>Нет</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Адрес'}/>}>
                            <Input className={'text-base'} placeholder={'Ввести'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'ИНН организации'}/>}>
                            <Input className={'text-base'} placeholder={'Ввести'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Организация'}/>}>
                            <Input className={'text-base'} placeholder={'Автоматический подбор'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<LabelFormItem label={'Дата начала'}/>}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

