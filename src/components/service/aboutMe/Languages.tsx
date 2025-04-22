import { UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Modal, Result, Row, Spin, Upload, message } from 'antd'
import { Select } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import {
	Certificate,
	ForeignLanguage,
	Language,
	LanguageLevel
} from '../../../models/aboutMe'
import {
	useGetAllNativeLanguagesQuery,
	useGetCertificateQuery,
	useGetLevelsQuery,
	useGetNativeLanguagesQuery,
	useGetOneCertificateQuery,
	useGetforeignLanguagesQuery,

	useLazyGetOneCertificateQuery,
	useSetForeignMutation,
	useSetNativeMutation
} from '../../../store/api/aboutMe/forAboutMe'

import './Languages.css'
import { SkeletonPage } from './Skeleton'
import TableLanguages from './TableLanguages'

const Languages = () => {
	const [form] = Form.useForm()
	const [form2] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectId, setSelectId] = useState<string | number | null>(null)
	const [fileList, setFileList] = useState<File[]>([])
	const { data: dataNative, isLoading: isFetchingNative, refetch, isError } = useGetNativeLanguagesQuery()
	const { data: dataLevels } = useGetLevelsQuery()
	const { data: dataCertificate } = useGetCertificateQuery()
	const { data: dataAll } = useGetAllNativeLanguagesQuery()
	const {data: dataForeign,isLoading: isFetchingForeign,isError: isErrorForeign,isSuccess} = useGetforeignLanguagesQuery()
	const [setNative, { isLoading }] = useSetNativeMutation()
	const [setForeign, { isLoading: isLoadingSetForeign }] = useSetForeignMutation()
	const [idCert, setIdCert] = useState<null | number>(null)
	const { data: dataOneCertificate } = useGetOneCertificateQuery(idCert, { skip: !idCert })
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
	const [triger,{}] = useLazyGetOneCertificateQuery()
	const nativeLanguageForm = Form.useWatch('languages', form)
	const sertificateFormVal = Form.useWatch('certificateId', form2)

	useEffect(() => {
		if (dataNative) {
			const initialValues = {
				languages: dataNative.languages?.map((lang: Language) => lang.code) || []
			}
			form.setFieldsValue(initialValues)
		}
	}, [dataNative])

	// Добавление Родного языка
	const onFinish = () => {
		setNative({ languageCodes: nativeLanguageForm }).unwrap()
	}

	// Добавление Иностранного языка
	const onFinishForm2 = async (values: Omit<ForeignLanguage, 'file'> & { file?: any[] }) => {
		// Подготовка базовой структуры данных
		const requestData: any = {
			languageCode: values.languageCode,
			languageLevelCode: values.languageLevelCode,
			isPublished: values.isPublished || false,
			certificates: []
		}
		// Обработка файла сертификата, если он есть
		if (fileList.length > 0 && selectedLabel && values.certificateId) {
			const originalFile = values.file?.[0]?.originFileObj as File
			if (originalFile) {
				// Конвертация файла в base64
				const base64File = await new Promise<string>(resolve => {
					const reader = new FileReader()
					reader.onload = () => {
						// Получаем base64 строку, удаляя префикс data:application/pdf;base64,
						const base64String = reader.result as string
						const base64Content = base64String.split(',')[1]
						resolve(base64Content)
					}
					reader.readAsDataURL(originalFile)
				})
				
				// Добавление информации о сертификате
				requestData.certificates = [
					{
						// certId: values.certificateId,
						// certificateName: selectedLabel,
						certificateName: originalFile.name,
						certificateTypeId: values.certificateId, // Используем тот же ID, если нет отдельного поля
						base64File: base64File
					}
				]
			}
		}

		// Отправка данных на сервер
		try {
			await setForeign(requestData).unwrap()
			setIsModalOpen(false)
			form2.resetFields()
			setFileList([])
			setSelectedLabel(null)
		} catch (error) {
			
			console.error('Ошибка при сохранении данных:', error)
			message.error('Не удалось сохранить данные о языке')
		}
	}

	const handleSubmit = (values: { content: string }) => {}
	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
		form2.resetFields()
	}
	const beforeUpload = (file: File) => {
		const isImage = file.type === 'application/pdf'
		const isLt5M = file.size / 1024 / 1024 < 5

		if (!isImage) {
			message.error('Можно загружать только PDF!')
			return false
		}

		if (!isLt5M) {
			message.error('Файл должен быть меньше 5MB!')
			return false
		}

		setFileList([file])
		return false
	}

	const handleIdCert = (id: number) => {
		setIdCert(id)
	}

	if (isError || isErrorForeign) {
		return (
			<div className="mt-[75px] ml-[20px]">
				<Result
					status="error"
					title=""
					subTitle={t('errorFetch')}

				></Result>
			</div>
		)
	}

	if (isFetchingNative || isFetchingForeign)
		return (
			<div className="mt-[-10px] ml-[6px]">
				<SkeletonPage />
			</div>
		)

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className=" rounded-xl  animate-fade-in">
				<Form form={form} onFinish={onFinish} className=" ">
					<Spin spinning={isLoading} className="flex gap-2">
						<Row className="mb-5">
							<Title className="!text-[28px]">{t('langZnan')}</Title>
						</Row>
						<Row className="mb-0 mt-3 w-full">
							<Col span={24}>
								<div className="text-[16px] font-bold mb-2">{t('nativeLanguage')}</div>

								<div className="w-full h-auto">
									<Form.Item
										name="languages"
										className="mb-0 w-full !h-auto"
										rules={[
											{
												validator: (_: any, value: string[]) =>
													value?.length > 10 ? Promise.reject(new Error(t('maxLanguagesError'))) : Promise.resolve()
											}
										]}
									>
										<Select
											mode="multiple"
											allowClear
											className=" !h-auto w-full"
											options={dataAll?.map((item: Language) => ({
												value: item.code,
												label: item.language
											}))}
											filterOption={(input, option) => 
												(option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
											  }
											
											onChange={values => {
												if (values.length > 10) {
													message.error(t('maxLanguagesError'))
													form.setFieldsValue({
														languages: values.slice(0, 10)
													})
												}
											}}
										/>
									</Form.Item>
								</div>
							</Col>
						</Row>
						<Row>
							<Button className="mt-4 w-[100px]" type="primary" htmlType="submit">
								{t('save')}
							</Button>
						</Row>
					</Spin>
				</Form>
			</div>

			<div className=" rounded-xl  mt-16 animate-fade-in">
				<Spin spinning={isLoadingSetForeign}>
					<Row className="mb-3">
						<Title className="!mb-0" level={5}>
							{t('foreignLanguage')}
						</Title>
					</Row>
					<Row>
						<TableLanguages
						    triger={triger}
							handleIdCert={handleIdCert}
							isSuccess={isSuccess}
							dataCertificate={dataCertificate}
							dataLevels={dataLevels}
							dataAll={dataAll}
							selectId={selectId}
							setSelectId={setSelectId}
							dataForeign={dataForeign}
						/>
					</Row>
					<Row className="flex items-center justify-start mt-4 gap-2">
						<div
							onClick={showModal}
							className="gap-2 flex items-center cursor-pointer  hover:bg-gray-200 p-2 rounded-xl"
						>
							<Button size="small" className="rounded-[50%] !w-[28px] !h-[28px] text-[24px] " type="primary">
								+
							</Button>
							<span>{t('add')}</span>
						</div>
					</Row>
				</Spin>
				{isLoadingSetForeign ? '' :
				<Modal
					className="!z-[10000000]"
					footer={null}
					title={t('langZnan')}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<Form className="mt-4" form={form2} onFinish={onFinishForm2}>
						<Form.Item
							label={<div className="">{t('language')}</div>}
							name="languageCode"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-4 h-[35px]"
							rules={[{ required: true, message: '' }]}
						>
							<Select
								allowClear
								options={dataAll?.map((item: Language) => ({
									value: item.code,
									label: item.language
								}))}
							/>
						</Form.Item>

						<Form.Item
							label={<div className="">{t('level')}</div>}
							name="languageLevelCode"
							labelCol={{ span: 12 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-14 h-[35px]"
							rules={[{ required: true, message: '' }]}
						>
							<Select
								aria-required
								options={dataLevels?.map((item: LanguageLevel) => ({
									value: item.languageLevelCode,
									label: item.languageLevel
								}))}
								allowClear
							/>
						</Form.Item>

						<Form.Item
							label={<div className="">{t('sert')}</div>}
							name="certificateId"
							labelCol={{ span: 12 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-14 h-[35px]"
							// rules={[{ required: true, message: '' }]}
						>
							<Select
								onSelect={(value: Certificate['id']) => {
									const selectedOption = dataCertificate?.find((item: Certificate) => item.id === value)
									if (selectedOption) {
										setSelectedLabel(selectedOption.certificateName)
									}
								}}
								allowClear
								options={dataCertificate?.map((item: Certificate) => ({
									value: item.id,
									label: item.certificateName
								}))}
							/>
						</Form.Item>

						<div className="mt-14 mb-2">{t('prikrep')}</div>
						<Form.Item 
						// rules={[{ required: true, message: '' }]}
						 name="file" getValueFromEvent={e => e?.fileList}>
							<Upload maxCount={1} beforeUpload={beforeUpload} accept=".pdf">
								<Button className=" " icon={<UploadOutlined />}>
									{t('add')}
								</Button>
							</Upload>
						</Form.Item>

						<Form.Item className="mt-6" name="isPublished" valuePropName="checked" label={null}>
							<Checkbox>{t('razrer')}</Checkbox>
						</Form.Item>

						<Button type="primary" htmlType="submit">
							{t('add')}
						</Button>
					</Form>
				</Modal>}
			
			</div>
		</div>
	)
}

export default Languages
