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
    Form, InputNumber
} from 'antd'
import dayjs from 'dayjs'
import React, {useEffect, useState} from 'react'
import {ArrowLeftSvg} from '../../../../assets/svg'
import {useCreateContractMutation} from '../../../../store/api/practiceApi/contracts'
import {ICreateContract, NameSpecialty} from '../../../../models/Practice'
import {validateMessages} from "../../../../utils/validateMessage";
import {useNavigate} from "react-router-dom";
import {RcFile} from "antd/es/upload";
import {useGetSpecialtyNamesQuery} from "../../../../store/api/practiceApi/roster";




export const CreateContracts = () => {
    const [form] = Form.useForm()
    const [inn, setInn] = useState<string | number | null>(0)
    const [files, setFiles] = useState<{
        pdfAgreement: Blob | null
        pdfContract: Blob | null
    }>({
        pdfAgreement: null,
        pdfContract: null,
    })
    const [nameOrg, setNameOrg] = useState(true)
    const nav = useNavigate()
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
    const [newContract] = useCreateContractMutation()
    const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesQuery()
    const [optionsNameSpec, setOptionsNameSpec] = useState<NameSpecialty[]>([])
    //const [selected, setSelected] = useState<number>()

    // useEffect(() => {
    //     form.setFieldValue('specialtyNameId', selected)
    // }, [selected]);

    useEffect(() => {
        if (isSuccessNameSpecialty) {
            setOptionsNameSpec(dataNameSpecialty)
        }
    }, [dataNameSpecialty]);


    function onFinish(values: ICreateContract) {
        const newForm = new FormData()
        const specName = dataNameSpecialty!.find(elem => {
            if (elem.value === values.specialtyNameId) {
                return elem
            }
        })
        values.specialtyNameId = specName!.id
        values.pdfContract = files.pdfContract!
        values.pdfAgreement = files.pdfAgreement!
        values.placesAmount = String(values.placesAmount)
        values.ITN = String(values.ITN)
        values.conclusionDate = dayjs(values.conclusionDate).format('DD.MM.YYYY')
        values.endDate = dayjs(values.endDate).format('DD.MM.YYYY')

        const jsonData = JSON.stringify(values)
        const blob = new Blob([jsonData], { type: 'application/json' })
        newForm.append('contract', blob)
        if (files.pdfContract) newForm.append('pdfContract', files.pdfContract)
        if (files.pdfAgreement) newForm.append('pdfAgreement', files.pdfAgreement)
        //console.log(values)
        newContract(newForm)
            .then(res => console.log(res))
            .catch(e => console.log(e))

        nav('/services/practices/registerContracts')
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

        if (String(inn).length === 10 || String(inn).length === 12) {
            fetch(url, options)
                .then(response => response.json())
                .then(res => {
                    //console.log(res)
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
                    Новый документ
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
                                   //dependencies={['contractFacility']}
                                   name={'ITN'}
                                   rules={[
                                       {
                                           required: true,
                                           pattern: new RegExp('^([0-9]{10}|[0-9]{12})$'),
                                           message: 'ИНН содержит 10 или 12 цифр',
                                       },
                                   ]}>
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
                            <Form.Item label={'Пролонгация (укажите количество лет)'}
                                       name={'prolongation'}
                                       rules={[{required: true}]}>
                                <InputNumber
                                    type={"number"}
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
                                   name={'specialtyNameId'}
                                   rules={[{required: false}]}>
                            <Select
                                mode="multiple"
                                allowClear
                                size="large"
                                popupMatchSelectWidth={false}
                                placeholder=""
                                defaultValue={[]}
                                className="w-full"
                                options={optionsNameSpec.map((item)=>{
                                    return {
                                        key:item.id,
                                        value: item.value,
                                        label: item.value
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
                                   rules={[{required: true}]}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({
                                        ...files,
                                        pdfContract: file
                                    })
                                    return false
                                }}
                                accept={'.pdf'}
                                maxCount={1}
                                name={'pdfContract'}
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
                                   rules={[{required: true}]}>
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
                            {/*    className="!rounded-full"*/}
                            {/*    size="large"*/}
                            {/*    onClick={() => {*/}
                            {/*        //setIsPreview(true)*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Режим просмотра*/}
                            {/*</Button>*/}
                        </Space>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}
