
import { PlusOutlined } from '@ant-design/icons'
import {
    Button,
    Col,
    DatePicker,
    Input,
    Row,
    Select,
    Space,
    Typography,
    Upload, Form, InputNumber
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Vector } from '../../../../assets/svg/Vector'
import {
    ICreateContract, NameSpecialty
} from '../../../../models/Practice'
import { validateMessages } from "../../../../utils/validateMessage"
import {
    useEditContractMutation,
    useGetContractForEditQuery
} from "../../../../store/api/practiceApi/contracts"
import { useGetSpecialtyNamesQuery } from "../../../../store/api/practiceApi/roster"
import { copyFileDocument } from "../../../../utils/downloadDocument/copyFileDocument"
import { agreementFileDocument } from "../../../../utils/downloadDocument/agreementFileDocument"
import { SkeletonPage } from './Skeleton'
import { endOfDay, isAfter } from 'date-fns'
import { t } from 'i18next'

export interface PdfContract {
    uid: string,
    name: string,
    status: string,
    url: string,
}

export const EditContract = () => {
    const [form] = Form.useForm()
    const path = useLocation()
    const nav = useNavigate()
    const id: string = path.pathname.split('/').at(-1)!
    const { data, isSuccess, isLoading } = useGetContractForEditQuery(id)
    const [editContract] = useEditContractMutation()
    const tokenAccess = localStorage.getItem('access')!.replaceAll('"', '')
    const optionsContractsType = [
        {
            value: 'Бессрочный',
            label: 'Бессрочный'
        },
        {
            value: 'Срочный',
            label: 'Срочный'
        },
        {
            value: 'С пролонгацией',
            label: 'С пролонгацией'
        }]
    const [hideSrok, setHideSrok] = useState(true)
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

    const [pdfContract, setPdfContract] = useState<any[]>()
    const [pdfAgreement, setPdfAgreement] = useState<any[]>()
    const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSpecialtyNamesQuery(null)
    const [optionsNameSpec, setOptionsNameSpec] = useState<NameSpecialty[]>([])
    const [nameSpec, setNameSpec] = useState<any>(null)

    useEffect(() => {
        if (isSuccess) {
            const x = dataNameSpecialty?.filter((item) => {
                return data?.specialtyNames?.includes(item.label)
            })
            setNameSpec(x?.map((item) => {
                return {
                    key: item.id,
                    value: item.id,
                    label: item.label
                }
            }))
        }
    }, [dataNameSpecialty, data, isSuccess])

    useEffect(() => {
        if (isSuccess) {
            const dataValid = dataNameSpecialty?.filter(item => data ? data?.specialtyNames.includes(item.value) : [])
            setOptionsNameSpec(dataValid ? dataValid : [])
        }
    }, [isSuccess, dataNameSpecialty]);

    useEffect(() => {
        if (isSuccess) {
            form.setFieldValue('ITN', data.itn)
            setInn(data.itn)

            if (data.contractType === 'Срочный') {
                setHideSrok(false)
            } else if (data.contractType === 'Бессрочный') {
                setHideSrok(true)
            }

            if (data.contractType === 'С пролонгацией') {
                form.setFieldValue('contractType', data.contractType)
                setProlongation(true)
                setHideSrok(false)
                form.setFieldValue('prolongation', data.prolongation)
            } else {
                form.setFieldValue('contractType', data.contractType)
                setProlongation(false)
            }

            form.setFieldValue('contractNumber', data.contractNumber)
            form.setFieldValue('conclusionDate', dayjs(data.conclusionDate))
            if (!hideSrok) {
                form.setFieldValue('endDate', dayjs(data.endDate))
            }

            setNameSpec(data?.specialtyNames.map((item:any)=>item.id))
            form.setFieldValue('specialtyNameIds', data?.specialtyNames)

            form.setFieldValue('actualFacility', data.actualFacility)
            form.setFieldValue('placesAmount', data.placesAmount)
            form.setFieldValue('pdfContract', data.documentCopyId)
            setPdfContract([{
                uid: '1',
                name: <a onClick={() => copyFileDocument(tokenAccess, data.documentCopyId)}>{t("pdfContract")}</a>,
                status: 'done',
            }])
            if (data.documentAgreementId !== null) {
                form.setFieldValue('pdfAgreement', data.documentAgreementId)
                setPdfAgreement([{
                    uid: '2',
                    name: <a onClick={() => agreementFileDocument(tokenAccess, data.documentAgreementId)}>{t("pdfAgreement")}</a>,
                    status: 'done',
                }])
            }
        }
    }, [data, optionsNameSpec]);

    function onFinish(values: ICreateContract) {
        const formDataEditContract = new FormData()

        values.specialtyNameIds = nameSpec
        values.placesAmount = String(values.placesAmount)
        values.ITN = String(values.ITN)
        values.conclusionDate = dayjs(values.conclusionDate).format('DD.MM.YYYY')
        values.endDate = dayjs(values.endDate).format('DD.MM.YYYY')

        const contract: any = {
            id: data?.id!,
            ITN: values.ITN,
            contractNumber: values.contractNumber,
            contractFacility: values.contractFacility,
            conclusionDate: values.conclusionDate,
            contractType: values.contractType,
            prolongation: values.prolongation,
            endDate: hideSrok ? null : values.endDate,
            specialtyNameIds: Array.isArray(nameSpec) && nameSpec.every(item => typeof item === 'object' && item !== null) ? nameSpec?.map((item)=>item.key) : nameSpec,
            legalFacility: values.legalFacility,
            actualFacility: values.actualFacility,
            placesAmount: values.placesAmount
        }
        console.log('contract',contract)
        const jsonData = JSON.stringify(contract)
        const blob = new Blob([jsonData], { type: 'application/json' })
        formDataEditContract.append('contract', blob)
        if (files.pdfContract) formDataEditContract.append('pdfContract', files.pdfContract)
        if (files.pdfAgreement) formDataEditContract.append('pdfAgreement', files.pdfAgreement)
        editContract(formDataEditContract)
            .then(data => console.log(data))
            .catch(e => console.log(e))
        nav('/services/practices/registerContracts')
    }
    console.log('nameSpec',nameSpec)
    useEffect(() => {
        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token 2491c0a94273928cee7e6656455eb71f1d74a54b",
            },
            body: JSON.stringify({ query: inn })
        }

        if (String(inn).length === 10 || String(inn).length === 12) {
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
    console.log('data',data)

    if (isLoading) return <SkeletonPage />

    return (
        <section className="container animate-fade-in">
            <Space size={10}>
                <Button
                    size="large"
                    style={{ width: '48px' }}
                    className="mt-1 mr-6 w-[48px] rounded-full border border-black"
                    icon={<Vector />}
                    type="text"
                    onClick={() => nav('/services/practices/registerContracts')}
                />
                <Typography.Text className="text-black text-3xl font-normal">
                    {t("editContract")} № {data?.contractNumber}
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
                        <Form.Item label={t("ITN")}
                            name={'ITN'}
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp('^([0-9]{10}|[0-9]{12})$'),
                                    message: 'ИНН содержит 10 или 12 цифр',
                                },
                            ]}
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
                                {t("organizationNotFound")}
                            </span>
                        }
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={t("contractFacility")}
                            name={'contractFacility'}
                            rules={[{ required: true }]}
                        >
                            <Input
                                className="w-full"
                                size="large"
                                onChange={elem => console.log(elem)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={t("contractNumber")}
                            name={'contractNumber'}
                            rules={[{ required: true }]}
                        >
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={t("conclusionDate")}
                            name={'conclusionDate'}
                            rules={[{ required: true }]}
                        >
                            <DatePicker
                                format={'DD.MM.YYYY'}
                                placeholder={''}
                                className="w-full"
                                size={'large'}
                                disabledDate={(current) => {
                                    return current && isAfter(current.toDate(), endOfDay(new Date()));
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={t("contractType")}
                            name={'contractType'}
                            rules={[{ required: true }]}
                        >
                            <Select
                                size="large"
                                popupMatchSelectWidth={false}
                                placeholder=""
                                defaultValue=""
                                className="w-full"
                                options={optionsContractsType}
                                onChange={value => {
                                    if (value === 'С пролонгацией') {
                                        setProlongation(true)
                                        setHideSrok(false)
                                    } else if (value === 'Бессрочный') {
                                        setProlongation(false)
                                        setHideSrok(true)
                                    } else if (value === 'Срочный') {
                                        setHideSrok(false)
                                        setProlongation(false)
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {
                    prolongation
                    &&
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                            <Form.Item label={t("prolongation")}
                                name={'prolongation'}
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    className="w-full"
                                    size="large"
                                    controls={false}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                }
                <Row gutter={[16, 16]}>
                    {hideSrok ? '' :
                        <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                            <Form.Item label={t("endDate")}
                                name={'endDate'}
                                rules={[{ required: true }]}
                                labelCol={{ style: { height: 54, display: 'flex', alignItems: 'center' } }}
                              
                            >
                                <DatePicker
                                    format={'DD.MM.YYYY'}
                                    placeholder={''}
                                    className="w-full"
                                    size={'large'}
                                />
                            </Form.Item>
                        </Col>}
                    <Col xs={24} sm={24} md={18} lg={hideSrok ? 16 : 8} xl={hideSrok ? 12 : 6}>
                        <Form.Item label={t("specialtyName")}
                            name={'specialtyNameIds'}
                            rules={[{ required: false }]}
                        >
                            <Select
                                mode="multiple"
                                size="large"
                                popupMatchSelectWidth={false}
                                placeholder=""
                                value={nameSpec}
                                className="w-full"
                                // onChange={(value) => setNameSpec(value)}
                                onSelect={(value, option) => {
                                    // option.id доступен здесь
                                    setNameSpec((prev:any) => [...prev, option.id])
                                }}
                                onDeselect={(value, option) => {
                                    setNameSpec((prev:any) => prev.filter((id:any) => id !== option.id))
                                }}
                                options={dataNameSpecialty?.map((item) => {
                                    return {
                                        // @ts-ignore
                                        label: item.value,
                                        value: item.value,
                                        key: item.id,
                                        id:item.id
                                    }
                                })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={t("legalFacility")}
                            name={'legalFacility'}
                            rules={[{ required: true }]}
                        >
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={t("actualFacility")}
                            name={'actualFacility'}
                            rules={[{ required: true }]}
                        >
                            <Input
                                className="w-full"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={t("placesAmount")}
                            name={'placesAmount'}
                        >
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
                        <Form.Item label={t("pdfContract")}
                            name={'pdfContract'}
                            rules={[{ required: true }]}
                        >
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({
                                        ...files,
                                        pdfContract: file
                                    })
                                    return false
                                }}
                                maxCount={1}
                                accept={'.pdf'}
                                name={'pdfContract'}
                                fileList={pdfContract}
                                onChange={info => {
                                    if (info.file.status === "removed") {
                                        form.setFieldValue('pdfContract', undefined)
                                    }
                                }}
                                onRemove={file => {
                                    setPdfContract(undefined)
                                }}
                            >
                                <Button
                                    className="w-full"
                                    size="large"
                                    type="primary"
                                    icon={<PlusOutlined />}
                                >
                                    {t("addFile")}
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={t("pdfAgreement")}
                            name={'pdfAgreement'}
                        >
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({
                                        ...files,
                                        pdfAgreement: file
                                    })
                                    return false
                                }}
                                maxCount={1}
                                accept={'.pdf'}
                                name={'pdfAgreement'}
                                fileList={pdfAgreement}
                                onChange={info => {
                                    if (info.file.status === "removed") {
                                        form.setFieldValue('pdfAgreement', undefined)
                                    }
                                }}
                                onRemove={file => {
                                    setPdfAgreement(undefined)
                                }}
                            >
                                <Button
                                    className="w-full"
                                    size="large"
                                    type="primary"
                                    icon={<PlusOutlined />}
                                >
                                    {t("addFile")}
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
                                {t("save")}
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}

export default EditContract
