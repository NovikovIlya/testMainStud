// import {EyeOutlined, PlusOutlined} from '@ant-design/icons'
// import {
//     Button,
//     Col,
//     DatePicker,
//     Input,
//     Row,
//     Select,
//     Space,
//     Typography,
//     Upload,
//     Form, InputNumber,
//     message,
//     Spin
// } from 'antd'
// import dayjs from 'dayjs'
// import React, {useEffect, useState} from 'react'
// import {ArrowLeftSvg} from '../../../../assets/svg'
// import {Vector} from '../../../../assets/svg/Vector'
// import {useCreateContractMutation} from '../../../../store/api/practiceApi/contracts'
// import {ICreateContract, NameSpecialty} from '../../../../models/Practice'
// import {validateMessages} from "../../../../utils/validateMessage";
// import {useNavigate} from "react-router-dom";
// import {useGetSpecialtyNamesQuery} from "../../../../store/api/practiceApi/roster";
// import { endOfDay, isAfter, isBefore, startOfDay } from 'date-fns'


// export const CreateContracts = () => {
//     const [form] = Form.useForm()
//     const [inn, setInn] = useState<string | number | null>(0)
//     const [files, setFiles] = useState<any>({
//         pdfAgreement: null,
//         pdfContract: null,
//     })
//     const [nameOrg, setNameOrg] = useState(true)
//     const nav = useNavigate()
//     const optionsContractsType = [
//         {
//             value: 'Бессрочный',
//             label: 'Бессрочный'
//         },
//         {
//             value: 'Срочный',
//             label: 'Срочный'
//         },
//         {
//             value: 'С пролонгацией',
//             label: 'С пролонгацией'
//     }]
//     const [prolongation, setProlongation] = useState(false)
//     const [hideSrok,setHideSrok] = useState(true)
//     const [newContract,{isLoading}] = useCreateContractMutation()
//     const {data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty} = useGetSpecialtyNamesQuery(null)
//     const [optionsNameSpec, setOptionsNameSpec] = useState<NameSpecialty[]>([])
//     const [nameSpec,setNameSpec] = useState<any>(null)
    

   
//     useEffect(() => {
//         if (isSuccessNameSpecialty) {
//             setOptionsNameSpec(dataNameSpecialty)
//         }
//     }, [dataNameSpecialty]);

//     useEffect(() => {
//         let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
//         let query = "1655018018";

//         let options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//                 "Authorization": "Token 2491c0a94273928cee7e6656455eb71f1d74a54b",
//             },
//             body: JSON.stringify({query: inn})
//         }

//         if (String(inn).length === 10 || String(inn).length === 12) {
//             fetch(url, options)
//                 .then(response => response.json())
//                 .then(res => {
//                     //console.log(res)
//                     if (res.suggestions.length !== 0) {
//                         setNameOrg(true)
//                         form.setFieldValue('contractFacility', res.suggestions[0].data.name.full_with_opf)
//                         form.setFieldValue('legalFacility', res.suggestions[0].data.address.unrestricted_value)
//                     } else {
//                         setNameOrg(false)
//                     }
//                 })
//                 .catch(error => console.log("error", error));
//         } else {
//             setNameOrg(true)
//             form.resetFields(['contractFacility', 'legalFacility'])
//         }
//     }, [inn]);


//     function onFinish(values: ICreateContract) {
//         const newForm = new FormData()
//         values.contractNumber = values.contractNumber
//         values.contractFacility = values.contractFacility
//         values.specialtyNameIds = nameSpec
//         values.prolongation = values.prolongation
//         values.contractType = values.contractType
//         values.pdfContract = files.pdfContract!
//         values.pdfAgreement = files.pdfAgreement!
//         values.placesAmount = String(values.placesAmount)
//         values.legalFacility = values.legalFacility
//         values.actualFacility = values.actualFacility
//         values.itn = String(values.ITN)
//         values.conclusionDate = dayjs(values.conclusionDate).format('DD.MM.YYYY')
//         // @ts-ignore
//         values.endDate = hideSrok ? null : dayjs(values.endDate).format('DD.MM.YYYY')
//         const jsonData = JSON.stringify(values)
//         const blob = new Blob([jsonData], { type: 'application/json' })
//         newForm.append('contract', blob)
//         if (files.pdfContract) newForm.append('pdfContract', files.pdfContract)
//         if (files.pdfAgreement) newForm.append('pdfAgreement', files.pdfAgreement)

//         newContract(newForm).unwrap().then(res => {
//             console.log(res)
//             nav('/services/practices/registerContracts')
//         })
//             // .then(res => console.log(res))
//             // .catch(e => console.log(e))

//         // nav('/services/practices/registerContracts')
//     }

//     const handleKeyDown = (event:any) => {
//         // Разрешаем ввод только цифр и некоторых специальных символов
//         const validKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Escape'];
//         if (
//           !validKeys.includes(event.key) &&
//           !/^\d$/.test(event.key) && // Разрешаем ввод только цифр
//           event.key !== '.' // Разрешаем ввод точки для разделения дат
//         ) {
//           event.preventDefault(); // Запрещаем ввод недопустимых символов
//         }
//     };
    
//     console.log('optionsNameSpec',optionsNameSpec)

//     return (
//         <Spin spinning={isLoading}>
//         <section className="container animate-fade-in">
//             <Space size={10}>
//                 <Button
//                     size="large"
//                     style={{width:'48px'}}
//                     className="mt-1 mr-6 w-[48px] rounded-full border border-black"
//                     icon={<Vector />}
//                     type="text"
//                     onClick={() => nav('/services/practices/registerContracts')}
//                 />
//                 <Typography.Text className="text-black text-3xl font-normal">
//                     Новый документ
//                 </Typography.Text>
//             </Space>
//             <Form<any>
//                   validateMessages={validateMessages}
//                   layout={'vertical'}
//                   onFinish={values => onFinish(values)}
//                   form={form}
//             >
//                 <Row gutter={[16, 16]} className="mt-12">
//                     <Col xs={24} sm={24} md={18} lg={16} xl={12}>
//                         <Form.Item label={'ИНН'}
//                                    //dependencies={['contractFacility']}
//                                    name={'ITN'}
//                                    rules={[
//                                        {
//                                            required: true,
//                                            pattern: new RegExp('^([0-9]{10}|[0-9]{12})$'),
//                                            message: 'ИНН содержит 10 или 12 цифр',
//                                        },
//                                    ]}>
//                             <InputNumber
//                                 type={'number'}
//                                 controls={false}
//                                 className="w-full"
//                                 size="large"
//                                 onChange={value => setInn(value)}
//                             />
//                         </Form.Item>
//                         {!nameOrg &&
//                             <span className={'absolute top-[70px] text-[#FF4d4F]'}>
//                                 Организация не найдена. Проверьте ИНН.
//                             </span>
//                         }
//                     </Col>
//                 </Row>
//                 <Row gutter={[16, 16]}>
//                     <Col xs={24} sm={24} md={18} lg={16} xl={12}>
//                         <Form.Item label={'Наименование организации по договору'}
//                                    name={'contractFacility'}
//                                    rules={[{required: true}]}>
//                             <Input
//                                 className="w-full"
//                                 size="large"
//                             />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={[16, 16]}>
//                     <Col xs={24} sm={24} md={18} lg={16} xl={12}>
//                         <Form.Item label={'Номер договора'}
//                                    name={'contractNumber'}
//                                    rules={[{required: true}]}>
//                             <Input
//                                 className="w-full"
//                                 size="large"
//                                 autoComplete="off"
//                             />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={[16, 16]}>
//                     <Col xs={24} sm={24} md={18} lg={8} xl={6}>
//                         <Form.Item label={'Дата заключения договора'}
//                                    name={'conclusionDate'}
//                                    rules={[{required: true}]}>
//                             <DatePicker
//                                 format={'DD.MM.YYYY'}
//                                 placeholder={''}
//                                 className="w-full"
//                                 size={'large'}
//                                 allowClear
//                                 onKeyDown={handleKeyDown}
//                                 disabledDate={(current) => {
//                                     // Отключаем даты, которые больше текущей даты
//                                     return current && isAfter(current.toDate(), endOfDay(new Date()));
//                                   }}
//                             />
//                         </Form.Item>

//                     </Col>
//                     <Col xs={24} sm={24} md={18} lg={8} xl={6}>
//                         <Form.Item label={'Тип договора'}
//                                    name={'contractType'}
//                                    rules={[{required: true}]}>
//                             <Select
//                                 size="large"
//                                 popupMatchSelectWidth={false}
//                                 placeholder=""
//                                 defaultValue=""
//                                 className="w-full"
//                                 options={optionsContractsType}
//                                 onChange={value => {
//                                     if (value === 'С пролонгацией') {
//                                         setProlongation(true)
//                                         setHideSrok(false)
//                                     } else if(value === 'Бессрочный'){
//                                         setProlongation(false)
//                                         setHideSrok(true)

//                                     }else {
//                                         setHideSrok(false)
//                                         setProlongation(false)
//                                     }
//                                 }}
//                             />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 {
//                     prolongation
//                     &&
//                     <Row gutter={[16, 16]}>
//                         <Col xs={24} sm={24} md={18} lg={16} xl={12}>
//                             <Form.Item label={'Пролонгация (укажите количество лет)'}
//                                        name={'prolongation'}
//                                        rules={[{required: true}]}>
//                                 <InputNumber
//                                     type={"number"}
//                                     className="w-full"
//                                     size="large"
//                                     controls={false}
//                                     min={1}
//                                 />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                 }
//                 <Row gutter={[16, 16]}>
//                 {hideSrok ? '' :
//                     <Col xs={24} sm={24} md={18} lg={8} xl={6}>
//                         <Form.Item 
//                                    label={'Срок действия  договора'}
//                                    name={'endDate'}
//                                    rules={[{required: true}]}>
//                             <DatePicker
//                                 format={'DD.MM.YYYY'}
//                                 placeholder={''}
//                                 className="w-full "
//                                 size={'large'}
//                                 disabledDate={(current) => {
//                                     return current && current.isBefore(startOfDay(new Date()));
//                                 }}
//                             />
//                         </Form.Item>
//                     </Col>}
//                     <Col xs={24} sm={24} md={18} lg={hideSrok ? 16 : 8} xl={hideSrok ? 12 : 6}>
//                         <Form.Item label={'Шифр и наименование специальности'}
//                                    name={'specialtyNameIds'}
//                                    rules={[{required: false}]}
//                                    required={true}
//                                    >
                                    
//                             <Select
//                                 showSearch
//                                 filterOption={(input, option) =>
//                                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
//                                   }
//                                 mode="multiple"
//                                 allowClear
//                                 size="large"
//                                 popupMatchSelectWidth={false}
//                                 placeholder=""
//                                 defaultValue={[]}
//                                 className="w-full"
//                                 onChange={(value)=>setNameSpec(value)}
//                                 options={optionsNameSpec.filter((option, index, self) =>
//                                     index === self.findIndex((o) => (
//                                         o.value === option.value
//                                     ))
//                                 ).map((item)=>{
//                                     return {
//                                         key:item.id,
//                                         value: item.id,
//                                         label: item.value
//                                     }
//                                 })}
//                             />
//                         </Form.Item>

//                     </Col>
//                 </Row>
//                 <Row gutter={[16, 16]}>
//                     <Col xs={24} sm={24} md={18} lg={16} xl={12}>
//                         <Form.Item label={'Юридический адрес организации'}
//                                    name={'legalFacility'}
//                                    rules={[{required: true}]}>
//                             <Input
//                                 className="w-full"
//                                 size="large"
//                                 autoComplete="adress" 
//                             />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={[16, 16]}>
//                     <Col xs={24} sm={24} md={18} lg={16} xl={12}>
//                         <Form.Item label={'Фактический адрес организации'}
//                                    name={'actualFacility'}
//                                    rules={[{required: true}]}>
//                             <Input
//                                 className="w-full"
//                                 size="large"
//                                 autoComplete="adress" 
//                             />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={[16, 16]}>
//                     <Col xs={24} sm={24} md={18} lg={16} xl={12}>
//                         <Form.Item label={'Количество мест'}
//                                    name={'placesAmount'}
//                                    rules={[{required: true}]}
//                                    >
//                             <InputNumber
//                                 className="w-full"
//                                 size="large"
//                                 type={'number'}
//                                 controls={false}
//                                 min={0}
//                             />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={[16, 16]} className='mb-8'>
//                     <Col xs={24} sm={24} md={18} lg={8} xl={6}>
//                         <Form.Item label={'Прикрепить скан договора в формате pdf'}
//                                    name={'pdfContract'}
//                                    rules={[{required: true}]}
//                                    >
//                             <Upload
//                                 beforeUpload={(file) => {
//                                     const isPdf = file.type === 'application/pdf';
//                                     const isLt5M = file.size / 1024 / 1024 < 5; // Проверка на размер меньше 5 МБ

//                                     if (!isPdf) {
//                                         message.error('Вы можете загружать только PDF файлы!');
//                                         return false
//                                     }
//                                     if (!isLt5M) {
//                                         message.error('Файл должен быть меньше 5 МБ!');
//                                         return false
//                                     }
                                
//                                     setFiles({
//                                         ...files,
//                                         pdfContract: file
//                                     })
//                                     return false
//                                 }}
//                                 accept={'.pdf'}
//                                 maxCount={1}
//                                 fileList={files.pdfContract ? [files.pdfContract] : []}
//                                 name={'pdfContract'}
//                                 onChange={info => {
//                                     console.log('info', info)
//                                     if (info.file.status === "removed") {
//                                         form.setFieldValue('pdfContract', undefined)
//                                         setFiles({
//                                             ...files,
//                                             pdfContract: undefined
//                                         })
//                                     }
//                                 }}
//                             >
//                                 <Button
//                                     className="w-full sm:w-[300px]"
//                                     size="large"
//                                     type="primary"
//                                     icon={<PlusOutlined/>}
//                                 >
//                                     Добавить файл
//                                 </Button>
//                             </Upload>
//                         </Form.Item>

//                     </Col>
//                 </Row>
//                 <Row gutter={[16, 16]}>
//                     <Col xs={24} sm={24} md={18} lg={8} xl={6}>
//                         <Form.Item label={'Прикрепить дополнительный документ в формате pdf'}
//                                    name={'pdfAgreement'}
//                                 //    rules={[{required: true}]}
//                                    >
//                             <Upload
//                                 beforeUpload={(file) => {
//                                     setFiles({
//                                         ...files,
//                                         pdfAgreement: file
//                                     })
//                                     return false
//                                 }}
//                                 maxCount={1}
//                                 accept={'.pdf'}
//                                 name={'pdfAgreement'}
//                                 onChange={info => {
//                                     if (info.file.status === "removed") {
//                                         form.setFieldValue('pdfAgreement', undefined)
//                                     }
//                                 }}
//                             >
//                                 <Button
//                                     className="w-full sm:w-[300px]"
//                                     size="large"
//                                     type="primary"
//                                     icon={<PlusOutlined/>}
//                                 >
//                                     Добавить файл
//                                 </Button>
//                             </Upload>
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={[16, 16]} className="my-8">
//                     <Col xs={24} sm={24} md={18} lg={8} xl={6}>
//                         <Space className="w-full">
//                             <Button
//                                 className="!rounded-full"
//                                 size="large"
//                                 type="primary"
//                                 htmlType="submit"
//                             >
//                                 Сохранить
//                             </Button>
//                             {/*<Button*/}
//                             {/*    className="!rounded-full"*/}
//                             {/*    size="large"*/}
//                             {/*    onClick={() => {*/}
//                             {/*        //setIsPreview(true)*/}
//                             {/*    }}*/}
//                             {/*>*/}
//                             {/*    Режим просмотра*/}
//                             {/*</Button>*/}
//                         </Space>
//                     </Col>
//                 </Row>
//             </Form>
//         </section>
//         </Spin>
//     )
// }
import { PlusOutlined } from "@ant-design/icons"
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
  Form,
  InputNumber,
  message,
  Spin,
} from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Vector } from "../../../../assets/svg/Vector"
import { useCreateContractMutation } from "../../../../store/api/practiceApi/contracts"
import type { ICreateContract, NameSpecialty } from "../../../../models/Practice"
import { validateMessages } from "../../../../utils/validateMessage"
import { useNavigate } from "react-router-dom"
import { useGetSpecialtyNamesQuery } from "../../../../store/api/practiceApi/roster"
import { endOfDay, isAfter, startOfDay } from "date-fns"
import { useTranslation } from "react-i18next"

export const CreateContracts = () => {
  const [form] = Form.useForm()
  const [inn, setInn] = useState<string | number | null>(0)
  const [files, setFiles] = useState<any>({
    pdfAgreement: null,
    pdfContract: null,
  })
  const [nameOrg, setNameOrg] = useState(true)
  const nav = useNavigate()
  const { t } = useTranslation()
  const optionsContractsType = [
    {
      value: "Бессрочный",
      label: t("indefinite"),
    },
    {
      value: "Срочный",
      label: t("fixed-term"),
    },
    {
      value: "С пролонгацией",
      label: t("with-prolongation"),
    },
  ]
  const [prolongation, setProlongation] = useState(false)
  const [hideSrok, setHideSrok] = useState(true)
  const [newContract, { isLoading }] = useCreateContractMutation()
  const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSpecialtyNamesQuery(null)
  const [optionsNameSpec, setOptionsNameSpec] = useState<NameSpecialty[]>([])
  const [nameSpec, setNameSpec] = useState<any>(null)

  useEffect(() => {
    if (isSuccessNameSpecialty) {
      setOptionsNameSpec(dataNameSpecialty)
    }
  }, [dataNameSpecialty])

  useEffect(() => {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party"
    const query = "1655018018"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token 2491c0a94273928cee7e6656455eb71f1d74a54b",
      },
      body: JSON.stringify({ query: inn }),
    }

    if (String(inn).length === 10 || String(inn).length === 12) {
      fetch(url, options)
        .then((response) => response.json())
        .then((res) => {
          //console.log(res)
          if (res.suggestions.length !== 0) {
            setNameOrg(true)
            form.setFieldValue("contractFacility", res.suggestions[0].data.name.full_with_opf)
            form.setFieldValue("legalFacility", res.suggestions[0].data.address.unrestricted_value)
          } else {
            setNameOrg(false)
          }
        })
        .catch((error) => console.log("error", error))
    } else {
      setNameOrg(true)
      form.resetFields(["contractFacility", "legalFacility"])
    }
  }, [inn])

  function onFinish(values: ICreateContract) {
    const newForm = new FormData()
    values.contractNumber = values.contractNumber
    values.contractFacility = values.contractFacility
    values.specialtyNameIds = nameSpec
    values.prolongation = values.prolongation
    values.contractType = values.contractType
    values.pdfContract = files.pdfContract!
    values.pdfAgreement = files.pdfAgreement!
    values.placesAmount = String(values.placesAmount)
    values.legalFacility = values.legalFacility
    values.actualFacility = values.actualFacility
    values.itn = String(values.ITN)
    values.conclusionDate = dayjs(values.conclusionDate).format("DD.MM.YYYY")
    // @ts-ignore
    values.endDate = hideSrok ? null : dayjs(values.endDate).format("DD.MM.YYYY")
    const jsonData = JSON.stringify(values)
    const blob = new Blob([jsonData], { type: "application/json" })
    newForm.append("contract", blob)
    if (files.pdfContract) newForm.append("pdfContract", files.pdfContract)
    if (files.pdfAgreement) newForm.append("pdfAgreement", files.pdfAgreement)

    newContract(newForm)
      .unwrap()
      .then((res) => {
        console.log(res)
        nav("/services/practices/registerContracts")
      })
    // .then(res => console.log(res))
    // .catch(e => console.log(e))

    // nav('/services/practices/registerContracts')
  }

  const handleKeyDown = (event: any) => {
    // Разрешаем ввод только цифр и некоторых специальных символов
    const validKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Enter", "Escape"]
    if (
      !validKeys.includes(event.key) &&
      !/^\d$/.test(event.key) && // Разрешаем ввод только цифр
      event.key !== "." // Разрешаем ввод точки для разделения дат
    ) {
      event.preventDefault() // Запрещаем ввод недопустимых символов
    }
  }

  console.log("optionsNameSpec", optionsNameSpec)

  return (
    <Spin spinning={isLoading}>
      <section className="container animate-fade-in">
        <Space size={10}>
          <Button
            size="large"
            style={{ width: "48px" }}
            className="mt-1 mr-6 w-[48px] rounded-full border border-black"
            icon={<Vector />}
            type="text"
            onClick={() => nav("/services/practices/registerContracts")}
          />
          <Typography.Text className="text-black text-3xl font-normal">{t("newDocument")}</Typography.Text>
        </Space>
        <Form<any>
          validateMessages={validateMessages}
          layout={"vertical"}
          onFinish={(values) => onFinish(values)}
          form={form}
        >
          <Row gutter={[16, 16]} className="mt-12">
            <Col xs={24} sm={24} md={18} lg={16} xl={12}>
              <Form.Item
                label={t("ITN")}
                //dependencies={['contractFacility']}
                name={"ITN"}
                rules={[
                  {
                    required: true,
                    pattern: /^([0-9]{10}|[0-9]{12})$/,
                    message: t("ITNError"),
                  },
                ]}
              >
                <InputNumber
                  type={"number"}
                  controls={false}
                  className="w-full"
                  size="large"
                  onChange={(value) => setInn(value)}
                />
              </Form.Item>
              {!nameOrg && <span className={"absolute top-[70px] text-[#FF4d4F]"}>{t("organizationNotFound")}</span>}
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={18} lg={16} xl={12}>
              <Form.Item label={t("contractFacility")} name={"contractFacility"} rules={[{ required: true }]}>
                <Input className="w-full" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={18} lg={16} xl={12}>
              <Form.Item label={t("contractNumber")} name={"contractNumber"} rules={[{ required: true }]}>
                <Input className="w-full" size="large" autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={18} lg={8} xl={6}>
              <Form.Item label={t("conclusionDate")} name={"conclusionDate"} rules={[{ required: true }]}>
                <DatePicker
                  format={"DD.MM.YYYY"}
                  placeholder={""}
                  className="w-full"
                  size={"large"}
                  allowClear
                  onKeyDown={handleKeyDown}
                  disabledDate={(current) => {
                    // Отключаем даты, которые больше текущей даты
                    return current && isAfter(current.toDate(), endOfDay(new Date()))
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={18} lg={8} xl={6}>
              <Form.Item label={t("contractType")} name={"contractType"} rules={[{ required: true }]}>
                <Select
                  size="large"
                  popupMatchSelectWidth={false}
                  placeholder=""
                  defaultValue=""
                  className="w-full"
                  options={optionsContractsType}
                  onChange={(value) => {
                    if (value === "С пролонгацией") {
                      setProlongation(true)
                      setHideSrok(false)
                    } else if (value === "Бессрочный") {
                      setProlongation(false)
                      setHideSrok(true)
                    } else {
                      setHideSrok(false)
                      setProlongation(false)
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          {prolongation && (
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                <Form.Item label={t("prolongation")} name={"prolongation"} rules={[{ required: true }]}>
                  <InputNumber type={"number"} className="w-full" size="large" controls={false} min={1} />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={[16, 16]}>
            {hideSrok ? (
              ""
            ) : (
              <Col xs={24} sm={24} md={18} lg={8} xl={6}>
                <Form.Item label={t("endDate")} name={"endDate"} rules={[{ required: true }]}>
                  <DatePicker
                    format={"DD.MM.YYYY"}
                    placeholder={""}
                    className="w-full "
                    size={"large"}
                    disabledDate={(current) => {
                      return current && current.isBefore(startOfDay(new Date()))
                    }}
                  />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} sm={24} md={18} lg={hideSrok ? 16 : 8} xl={hideSrok ? 12 : 6}>
              <Form.Item
                label={t("specialtyNameIds")}
                name={"specialtyNameIds"}
                rules={[{ required: false }]}
                required={true}
              >
                <Select
                  showSearch
                  filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                  mode="multiple"
                  allowClear
                  size="large"
                  popupMatchSelectWidth={false}
                  placeholder=""
                  defaultValue={[]}
                  className="w-full"
                  onChange={(value) => setNameSpec(value)}
                  options={optionsNameSpec
                    .filter((option, index, self) => index === self.findIndex((o) => o.value === option.value))
                    .map((item) => {
                      return {
                        key: item.id,
                        value: item.id,
                        label: item.value,
                      }
                    })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={18} lg={16} xl={12}>
              <Form.Item label={t("legalFacility")} name={"legalFacility"} rules={[{ required: true }]}>
                <Input className="w-full" size="large" autoComplete="adress" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={18} lg={16} xl={12}>
              <Form.Item label={t("actualFacility")} name={"actualFacility"} rules={[{ required: true }]}>
                <Input className="w-full" size="large" autoComplete="adress" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={18} lg={16} xl={12}>
              <Form.Item label={t("placesAmount")} name={"placesAmount"} rules={[{ required: true }]}>
                <InputNumber className="w-full" size="large" type={"number"} controls={false} min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={24} md={18} lg={8} xl={6}>
              <Form.Item label={t("pdfContract")} name={"pdfContract"} rules={[{ required: true }]}>
                <Upload
                  beforeUpload={(file) => {
                    const isPdf = file.type === "application/pdf"
                    const isLt5M = file.size / 1024 / 1024 < 5 // Проверка на размер меньше 5 МБ

                    if (!isPdf) {
                      message.error(t("onlyPdf"))
                      return false
                    }
                    if (!isLt5M) {
                      message.error(t("fileSizeError"))
                      return false
                    }

                    setFiles({
                      ...files,
                      pdfContract: file,
                    })
                    return false
                  }}
                  accept={".pdf"}
                  maxCount={1}
                  fileList={files.pdfContract ? [files.pdfContract] : []}
                  name={"pdfContract"}
                  onChange={(info) => {
                    console.log("info", info)
                    if (info.file.status === "removed") {
                      form.setFieldValue("pdfContract", undefined)
                      setFiles({
                        ...files,
                        pdfContract: undefined,
                      })
                    }
                  }}
                >
                  <Button className="w-full sm:w-[300px]" size="large" type="primary" icon={<PlusOutlined />}>
                    {t("addFile")}
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={18} lg={8} xl={6}>
              <Form.Item
                label={t("pdfAgreement")}
                name={"pdfAgreement"}
                //    rules={[{required: true}]}
              >
                <Upload
                  beforeUpload={(file) => {
                    setFiles({
                      ...files,
                      pdfAgreement: file,
                    })
                    return false
                  }}
                  maxCount={1}
                  accept={".pdf"}
                  name={"pdfAgreement"}
                  onChange={(info) => {
                    if (info.file.status === "removed") {
                      form.setFieldValue("pdfAgreement", undefined)
                    }
                  }}
                >
                  <Button className="w-full sm:w-[300px]" size="large" type="primary" icon={<PlusOutlined />}>
                    {t("addFile")}
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="my-8">
            <Col xs={24} sm={24} md={18} lg={8} xl={6}>
              <Space className="w-full">
                <Button className="!rounded-full" size="large" type="primary" htmlType="submit">
                  {t("save")}
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
    </Spin>
  )
}

