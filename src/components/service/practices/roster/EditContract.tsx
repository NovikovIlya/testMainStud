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
import {
    IContractInfo,
    IContractInfoFull,
    ICreateContract,
    ICreateContractFull,
    NameSpecialty
} from '../../../../models/Practice'
import {validateMessages} from "../../../../utils/validateMessage";
import {
    useEditContractMutation,
    useGetContractForEditQuery,
    useGetContractQuery
} from "../../../../store/api/practiceApi/contracts";
import {string} from "yup";
import {useGetSpecialtyNamesQuery} from "../../../../store/api/practiceApi/roster";
import {copyFileDocument} from "../../../../utils/downloadDocument/copyFileDocument";
import {agreementFileDocument} from "../../../../utils/downloadDocument/agreementFileDocument";

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
    const {data, isSuccess} = useGetContractForEditQuery(id)
    const [editContract] = useEditContractMutation()
    const tokenAccess = localStorage.getItem('access')!.replaceAll('"', '')
    const optionsContractsType = [
        {
            value: 'Бессрочный',
            label: 'Бессрочный'
        },
        {
            value: 'С пролонгацией',
            label: 'С пролонгацией'
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

    const [pdfContract, setPdfContract] = useState<any[]>()
    const [pdfAgreement, setPdfAgreement] = useState<any[]>()
    const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesQuery()
    const [optionsNameSpec, setOptionsNameSpec] = useState<NameSpecialty[]>([])

    useEffect(() => {
        if (isSuccess) {
            const dataValid = dataNameSpecialty?.filter(item =>data ? data?.specialtyNames.includes(item.value) : [])
            setOptionsNameSpec(dataValid ? dataValid : [] )
        }
            const dataValid = dataNameSpecialty?.filter(item => data?.specialtyNames.includes(item.value))
    }, [ isSuccess,dataNameSpecialty]);
    useEffect(() => {
        if (isSuccess) {
            form.setFieldValue('ITN', data.itn)
            setInn(data.itn)

            //form.setFieldValue('contractFacility', data.contractFacility) - нет смысла устанавливать ,
            //название организации и юр.адрес подтягивается из api DaData

            if (data.contractType === 'С пролонгацией') {
                form.setFieldValue('contractType', data.contractType)
                setProlongation(true)
                form.setFieldValue('prolongation', data.prolongation)
            } else {
                form.setFieldValue('contractType', data.contractType)
            }

            form.setFieldValue('contractNumber', data.contractNumber)
            form.setFieldValue('conclusionDate', dayjs(data.conclusionDate))
            form.setFieldValue('endDate', dayjs(data.endDate))
            form.setFieldValue('specialtyNameIds', optionsNameSpec.map(i=>i.value))
            form.setFieldValue('actualFacility', data.actualFacility)
            form.setFieldValue('placesAmount', data.placesAmount)
            form.setFieldValue('pdfContract', data.documentCopyId)
            setPdfContract([{
                uid: '1',
                name: <a onClick={() => copyFileDocument(tokenAccess, data.documentCopyId)}>Скан договора</a>,
                status: 'done',
            }])

            form.setFieldValue('pdfAgreement', data.documentAgreementId)
            setPdfAgreement([{
                uid: '2',
                name: <a onClick={() => agreementFileDocument(tokenAccess, data.documentAgreementId)}>Доп.соглашение</a>,
                status: 'done',
            }])
        }

        //при загруке данных проверять, есть ли пролонгация. Если есть, то ставить setProlongation(true)
    }, [data,optionsNameSpec]);

    function onFinish(values: ICreateContract) {
        const formDataEditContract = new FormData()
        const specName = dataNameSpecialty!.find(elem => {
            if (elem.value === values.specialtyNameId) {
                return elem
            }
        })
        console.log('values.specialtyNameId',values.specialtyNameId)
        console.log('specName',specName)
        values.specialtyNameIds = dataNameSpecialty?.filter(item => values.specialtyNameIds.includes(item.value)).map(item => item.id)
        // values.specialtyNameId = specName!.id
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
            endDate: values.endDate,
            specialtyNameIds: dataNameSpecialty?.filter(item => values.specialtyNameIds.includes(item.value)).map(item => item.id),
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

    useEffect(() => {
        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token 2491c0a94273928cee7e6656455eb71f1d74a54b",
            },
            body: JSON.stringify({query: inn})
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
            //проверить, будет ли работать, когда будет приходить ITN
        }
    }, [inn]);

    console.log('optionsNameSpec',optionsNameSpec)
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
                                onChange={elem => console.log(elem)}
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
                                   rules={[{required: true}]}>
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
                                    } else setProlongation(false)
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
                            <Form.Item label={'Пролонгация'}
                                       name={'prolongation'}
                                       rules={[{required: true}]}>
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
                    <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                        <Form.Item label={'Срок действия договора'}
                                   name={'endDate'}
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
                                   name={'specialtyNameIds'}
                                   rules={[{required: false}]}>
                            <Select
                                mode="multiple"
                                size="large"
                                popupMatchSelectWidth={false}
                                placeholder=""
                              
                                className="w-full"
                                options={dataNameSpecialty?.map((item)=>{
                                    return{
                                        key:item.id,
                                        value:item.value,
                                        label:item.label
                                    }
                                })}
                                
                            />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                        <Form.Item label={'Юридический адрес организации'}
                                   name={'legalFacility'}
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
                                //    rules={[{required: true}]}
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
                        <Form.Item label={'Прикрепить скан договора в формате pdf'}
                                   name={'pdfContract'}
                                   rules={[{required: true}]}
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
                                //    rules={[{required: true}]}
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
