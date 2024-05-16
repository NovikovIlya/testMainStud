import {PlusOutlined} from '@ant-design/icons'
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
import dayjs from 'dayjs'
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {ArrowLeftSvg} from '../../../../assets/svg'
import {ICreateContract, ICreateContractFull} from '../../../../models/Practice'
import {validateMessages} from "../../../../utils/validateMessage";
import {useGetContractQuery} from "../../../../store/api/practiceApi/contracts";


export const EditContract = () => {
    const [form] = Form.useForm()
    const path = useLocation()
    const nav = useNavigate()
    const id: string = path.pathname.split('/').at(-1)!
    const {data, isSuccess} = useGetContractQuery(id)
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
    const [inn, setInn] = useState<string | number | null>(0)
    const [files, setFiles] = useState<{
        pdfAgreement: Blob | null
        pdfContract: Blob | null
    }>({
        pdfAgreement: null,
        pdfContract: null,
    })
    const [nameOrg, setNameOrg] = useState(true)

    useEffect(() => {
        if (isSuccess) {
            console.log(data)
        }
        form.setFieldValue('contractFacility', data?.contractFacility)
        form.setFieldValue('contractNumber', data?.contractNumber)
        form.setFieldValue('conclusionDate', dayjs(data?.conclusionDate))
        //при загруке данных проверять, есть ли пролонгация. Если есть, то ставить setProlongation(true)
    }, [data]);

    function onFinish(values: ICreateContract) {
        const formDataCreateContract = new FormData()
        values.conclusionDate = dayjs(values.conclusionDate).format('DD.MM.YYYY')
        values.endDate = dayjs(values.endDate).format('DD.MM.YYYY')
        // for (let key in values) {
        //     formDataCreateContract.append(key, values[key as keyof ICreateContract])
        // }
        console.log(values)
        console.log(formDataCreateContract)
    }

    useEffect(() => {
        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
        let query = "1655018018";

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token 2491c0a94273928cee7e6656455eb71f1d74a54b",
            },
            body: JSON.stringify({query: inn})
        }

        if (String(inn).length === 10) {
            fetch(url, options)
                .then(response => response.json())
                .then(res => {
                    if (res.suggestions.length !== 0) {
                        setNameOrg(true)
                        form.setFieldValue('contractFacility', res.suggestions[0].data.name.full_with_opf)
                        form.setFieldValue('legalFacility', res.suggestions[0].data.address.unrestricted_value)
                    } else {
                        setNameOrg(false)
                    }
                })
                .catch(error => console.log("error", error));
        } else {
            setNameOrg(true)
            form.resetFields(['contractFacility', 'legalFacility'])
        }
    }, [inn]);

    useEffect(() => {
        console.log(nameOrg)
    }, [nameOrg]);


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
                    Договор № {data?.contractNumber}
                </Typography.Text>
            </Space>
            <Form<ICreateContract>
                validateMessages={validateMessages}
                  layout={'vertical'}
                  onFinish={values => onFinish(values)}
                  form={form}
            >
                <Row gutter={[16, 16]} className="mt-12">
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'ИНН'}
                                   name={'ITN'}
                                   rules={[
                                       {
                                           required: true,
                                           pattern: new RegExp('^[0-9]{10}$'),
                                           message: 'ИНН содержит 10 цифр',
                                       },
                                   ]}
                                   initialValue={1234567890}
                        >
                            <InputNumber
                                type={'number'}
                                controls={false}
                                className="w-full"
                                size="large"
                                onChange={value => setInn(value)}
                            />
                        </Form.Item>
                        {!nameOrg &&
                            <span className={'absolute top-[70px] text-[#FF4d4F]'}>
                                Организация не найдена. Проверьте ИНН.
                            </span>
                        }
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Наименование организации по договору'}
                                   name={'contractFacility'}
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
                                   name={'conclusionDate'}
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
                                   name={'endDate'}
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
                                   name={'specialtyNameId'}
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
                                   name={'placesAmount'}
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
