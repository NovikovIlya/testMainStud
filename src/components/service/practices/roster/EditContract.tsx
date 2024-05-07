import {PlusOutlined} from '@ant-design/icons'
import {yupResolver} from '@hookform/resolvers/yup'
import {
    Button,
    Col,
    DatePicker,
    Input,
    Row,
    Select,
    Space,
    Typography,
    Upload,
    UploadFile,
    UploadProps,
    message, Form, InputNumber
} from 'antd'
import {format} from 'date-fns/format'
import dayjs from 'dayjs'
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

import {ArrowLeftSvg} from '../../../../assets/svg'
import {
    useChangeContractMutation,
    useCreateContractMutation,
    useGetContractQuery
} from '../../../../store/api/practiceApi/taskService'
import {ICreateContract, ICreateContractFull} from '../../../../models/Practice'
import {SignInSchema} from '../validation'
import {validateMessages} from "../../../../utils/validateMessage";


export const EditContract = () => {
    const [form] = Form.useForm()
    const nav = useNavigate()
    const optionsContractsType = [
        {
            value: 'Бессрочный',
            label: 'Бессрочный'
        },
        {
            value: 'Указать пролонгацию',
            label: 'Указать пролонгацию'
        }]
    const [prolongation, setProlongation] = useState(false)

    useEffect(() => {
        //при загруке данных проверять, есть ли пролонгация. Если есть, то ставить setProlongation(true)
    }, []);

    function onFinish(values: ICreateContract) {
        const formDataCreateContract = new FormData()
        values.conclusionDate = dayjs(values.conclusionDate).format('DD.MM.YYYY')
        values.endDate = dayjs(values.endDate).format('DD.MM.YYYY')
        for (let key in values) {
            formDataCreateContract.append(key, values[key as keyof ICreateContract])
        }
        console.log(values)
        console.log(formDataCreateContract)
    }


    return (
        <section className="container">
            <Space size={10}>
                <Button
                    size="large"
                    className="mt-1"
                    icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                    type="text"
                    onClick={() => nav('/services/practices/registerContracts')}
                />
                <Typography.Text className="text-black text-3xl font-normal">
                    Договор №
                </Typography.Text>
            </Space>
            <Form validateMessages={validateMessages}
                  layout={'vertical'}
                  onFinish={values => onFinish(values)}
                  form={form}
            >
                <Row gutter={[16, 16]} className="mt-12">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'ИНН'}
                                   name={'inn'}
                                   rules={[{required: true}]}
                                   initialValue={1234567890}
                        >
                            <InputNumber
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Наименование организации по договору'}
                                   name={'contractFacility'}
                                   initialValue={'Тест 1'}
                                   rules={[{required: true}]}>
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Номер договора'}
                                   name={'contractNumber'}
                                   initialValue={'Тест 1'}
                                   rules={[{required: true}]}>
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Дата заключения договора'}
                                   name={'dateConclusionContract'}
                                   initialValue={dayjs('12.12.2024')}
                                   rules={[{required: true}]}>
                            <DatePicker
                                format={'DD.MM.YYYY'}
                                placeholder={''}
                                className="w-full"
                                size={'large'}
                            />
                        </Form.Item>

                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Тип договора'}
                                   name={'contractType'}
                                   initialValue={'Указать пролонгацию'}
                                   rules={[{required: true}]}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                placeholder=""
                                defaultValue=""
                                className="w-full"
                                options={optionsContractsType}
                                onChange={value => {
                                    if (value === 'Указать пролонгацию') {
                                        setProlongation(true)
                                    } else setProlongation(false)
                                }}
                            />
                        </Form.Item>
                    </Col>
                    {
                        prolongation
                        &&
                        <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                            <Form.Item label={'Пролонгация'}
                                       name={'prolongation'}
                                       initialValue={12}
                                       rules={[{required: true}]}>
                                <InputNumber
                                    className="w-full"
                                    size="large"
                                    controls={false}
                                />
                            </Form.Item>
                        </Col>
                    }

                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Срок действия договора'}
                                   name={'contractTime'}
                                   initialValue={dayjs('12.12.2024')}
                                   rules={[{required: true}]}>
                            <DatePicker
                                format={'DD.MM.YYYY'}
                                placeholder={''}
                                className="w-full"
                                size={'large'}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Шифр и наименование специальности'}
                                   name={'specialtyName'}
                                   initialValue={'31.08.01 Акушерство и гинекология'}
                                   rules={[{required: true}]}>
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                placeholder=""
                                defaultValue=""
                                className="w-full"
                                options={[
                                    {
                                        value: '31.08.01 Акушерство и гинекология',
                                        label: '31.08.01 Акушерство и гинекология'
                                    },
                                    {
                                        value: '31.08.11 Педиатрия',
                                        label: '31.08.11 Педиатрия'
                                    }
                                ]}
                            />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Юридический адрес организации'}
                                   name={'legalFacility'}
                                   initialValue={'Тест 1'}
                                   rules={[{required: true}]}>
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Фактический адрес организации'}
                                   name={'actualFacility'}
                                   initialValue={'Тест 2'}
                                   rules={[{required: true}]}>
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Количество мест'}
                                   name={'placeNumber'}
                                   initialValue={100}
                                   rules={[{required: true}]}>
                            <InputNumber
                                className="w-full"
                                size="large"
                                type={'number'}
                                controls={false}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Прикрепить скан договора в формате pdf'}
                                   name={'pdfContract'}
                                   initialValue={[
                                       {
                                           uid: '2',
                                           name: 'yyy.png',
                                           url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                                       },
                                   ]}
                                   rules={[{required: true}]}
                        >
                            <Upload
                                beforeUpload={() => {
                                    return false
                                }}
                                maxCount={1}
                                accept={'.pdf'}
                                name={'pdfContract'}
                                defaultFileList={[
                                	{
                                		uid: '2',
                                		name: 'yyy.png',
                                        status: 'done',
                                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                                	}
                                ]}
                                onChange={info => {
                                    if (info.file.status === "removed") {
                                        form.setFieldValue('pdfContract', undefined)
                                    }
                                }}

                            >
                                <Button
                                    className="w-full"
                                    size="large"
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                >
                                    Добавить файл
                                </Button>
                            </Upload>
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Прикрепить дополнительный документ в формате pdf'}
                                   name={'pdfAgreement'}
                                   initialValue={[
                                       {
                                           uid: '2',
                                           name: 'yyy.png',
                                           url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                                       },
                                   ]}
                                   rules={[{required: true}]}
                        >
                            <Upload
                                beforeUpload={() => {return false}}
                                maxCount={1}
                                accept={'.pdf'}
                                name={'pdfAgreement'}
                                defaultFileList={[
                                    {
                                        uid: '2',
                                        name: 'yyy.png',
                                        status: 'done',
                                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                                    }
                                ]}
                                onChange={info => {
                                    if (info.file.status === "removed") {
                                        form.setFieldValue('pdfAgreement', undefined)
                                    }
                                }}
                            >
                                <Button
                                    className="w-full"
                                    size="large"
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                >
                                    Добавить файл
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="my-8">
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Space className="w-full">
                            <Button
                                className="!rounded-full"
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                Сохранить
                            </Button>
                            {/*<Button*/}
                            {/*	className="!rounded-full"*/}
                            {/*	size="large"*/}
                            {/*	onClick={() => {*/}
                            {/*		//setIsPreview(true)*/}
                            {/*	}}*/}
                            {/*>*/}
                            {/*	Режим просмотра*/}
                            {/*</Button>*/}
                        </Space>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}
