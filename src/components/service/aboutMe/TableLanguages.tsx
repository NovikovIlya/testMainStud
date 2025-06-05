// import { DeleteTwoTone, EditTwoTone, EyeInvisibleTwoTone, EyeTwoTone, UploadOutlined } from '@ant-design/icons'
// import {
// 	Button,
// 	Checkbox,
// 	ConfigProvider,
// 	Form,
// 	Modal,
// 	Popconfirm,
// 	Select,
// 	Space,
// 	Spin,
// 	Table,
// 	Upload,
// 	message
// } from 'antd'
// import type { TableProps } from 'antd'
// import { t } from 'i18next'
// import React, { useEffect, useState } from 'react'

// import { CertificateTs, FormValues, LanguageData, TableLanguagesProps } from '../../../models/aboutMe'
// import {
// 	useDeleteForeignMutation,
// 	useEditForeignMutation,
// 	useIsPublishedMutation
// } from '../../../store/api/aboutMe/forAboutMe'

// import './TableLanguage.scss'
// import { getBaseUrl } from '../../../utils/getBaseUrl'

// const TableLanguages = ({
// 	triger,
// 	handleIdCert,
// 	isSuccess,
// 	dataCertificate,
// 	dataLevels,
// 	dataAll,
// 	dataForeign,
// 	setSelectId,
// 	selectId
// }: TableLanguagesProps) => {
// 	const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
// 	const [selectInfo, setSelectInfo] = useState<LanguageData | null>(null)
// 	const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
// 	const [form2] = Form.useForm()
// 	const [fileList, setFileList] = useState<any[]>([])
// 	const [editForeign, { isLoading: isLoadingEdit }] = useEditForeignMutation()
// 	const [deleteCert, setDeleteCert] = useState<any[]>([])
// 	const [deleteForeign, { isLoading: isLoadingDelete }] = useDeleteForeignMutation()
// 	const [changeGlaz, { isLoading: isLoadingGlaz }] = useIsPublishedMutation()
// 	const [fileArray, setFileArray] = useState<any[]>([])
// 	const columns: TableProps<LanguageData>['columns'] = [
// 		{
// 			title: t('language'),
// 			dataIndex: 'language',
// 			key: 'name',
// 			render: text => <div>{text}</div>
// 		},
// 		{
// 			title: t('level'),
// 			dataIndex: 'languageLevel',
// 			key: 'age'
// 		},
// 		{
// 			title: t('sert'),
// 			dataIndex: 'certificates',
// 			key: 'address',
// 			render: certificates => (
// 				<>
// 					{certificates?.map((item: CertificateTs, index: number) => (
// 						<div
// 							className="flex gap-2"
// 							key={index}
// 							onClick={() => {
// 								// handleIdCert(item?.certId)
// 								console.log('item?.id', item?.certId)
// 								// triger(item?.certId)
// 							}}
// 						>
// 							<a
// 								target="_blank"
// 								href={`${getBaseUrl()}activities/languages/foreign/certificate?certificateId=${item.certId}`}
// 							>
// 								{item.certificateName}
// 							</a>
// 							<span>
// 								({item?.certificateTypeName}) {index === certificates.length - 1 ? '' : ', '}
// 							</span>
// 						</div>
// 					))}
// 				</>
// 			)
// 		},
// 		{
// 			title: '',
// 			key: 'action',
// 			dataIndex: 'isPublished',
// 			render: (_, record) => (
// 				<>
// 					{/* @ts-ignore */}
// 					{record?.isPublished ? (
// 						<EyeTwoTone
// 							// @ts-ignore
// 							className={`hover:scale-[140%]`}
// 							onClick={e => {
// 								e.preventDefault()
// 								e.stopPropagation()
// 								// @ts-ignore
// 								setSelectId(record?.userLangId)
// 								// @ts-ignore
// 								changeGlaz(record?.langId)
// 							}}
// 						/>
// 					) : (
// 						<EyeInvisibleTwoTone
// 							// @ts-ignore
// 							className={` hover:scale-[140%]`}
// 							onClick={e => {
// 								e.preventDefault()
// 								e.stopPropagation()
// 								// @ts-ignore
// 								setSelectId(record?.userLangId)
// 								// @ts-ignore
// 								changeGlaz(record?.langId)
// 							}}
// 						/>
// 					)}
// 				</>
// 			)
// 		},

// 		{
// 			title: '',
// 			key: 'action',
// 			render: (_, record) => (
// 				<Space size="middle">
// 					<EditTwoTone
// 						className="hover:scale-[140%] transition-transform duration-200 delay-100"
// 						onClick={() => {
// 							setSelectId(record.studLangId)
// 							setSelectInfo(record)
// 							showModalEdit()
// 						}}
// 					/>
// 				</Space>
// 			)
// 		},
// 		{
// 			title: '',
// 			key: 'action',
// 			render: (_, record) => (
// 				<Space size="middle">
// 					<Popconfirm
// 						title={t('deleteEducationTitle')}
// 						description={t('deleteEducationDescription')}
// 						onConfirm={() => {
// 							handleDelete(record?.langId)
// 						}}
// 					>
// 						<DeleteTwoTone className="hover:scale-[140%] " />
// 					</Popconfirm>
// 				</Space>
// 			)
// 		}
// 	]
// 	useEffect(() => {
// 		if (selectInfo?.certificates) {
// 			setFileArray(selectInfo?.certificates)
// 		}
// 	}, [selectInfo?.certificates])
// 	console.log('selectInfo',selectInfo)
// 	useEffect(() => {
// 		if (selectInfo) {
// 			const fileList = selectInfo?.certificates?.map((certificate: CertificateTs, index: number) => ({
// 				certId: certificate.certId,
// 				uid: `-${index}`, // Уникальный ID для каждого файла
// 				name: certificate.certificateName, // Имя файла
// 				status: 'done', // Статус загрузки
// 				url: certificate.certificateLink // URL файла
// 			}))
// 			form2.setFieldsValue({
// 				languageCode: selectInfo.language,
// 				languageLevelCode: selectInfo.languageLevelCode,
// 				certificateId: selectInfo.certificates?.[0]?.certificateTypeId || null, // Если сертификатов нет, устанавливаем null
// 				isPublished: selectInfo.isPublished,
// 				file: fileList
// 			})
// 		}
// 	}, [isSuccess, selectInfo, form2])

// 	const handleDelete = (record: any) => {
// 		console.log('recordDelete', record)
// 		deleteForeign(record)
// 	}

// 	const showModalEdit = () => {
// 		setIsModalOpenEdit(true)
// 	}

// 	const handleOkEdit = () => {
// 		setIsModalOpenEdit(false)
// 	}

// 	const handleCancelEdit = () => {
// 		setIsModalOpenEdit(false)
// 		setDeleteCert([])
// 	}

// 	const onFinishForm2 = async (values: any) => {
// 		console.log('values', values)
// 		// Подготовка базовой структуры данных в новом формате
// 		const requestData: any = {
// 			langId: selectInfo?.langId,
// 			languageLevelCode: values.languageLevelCode,
// 			isPublished: values.isPublished || false,
// 			savingCertificates: [], // Массив для сохраняемых сертификатов
// 			deletingCertificates: deleteCert // Массив для удаляемых сертификатов
// 		}

		
// 		// if (values.certificateId) {
// 		// 	requestData.savingCertificates.push({
// 		// 		certificateTypeId: values.certificateId
// 		// 	});
// 		// }

// 		// Обработка файла сертификата, если он есть
// 		if (fileList.length > 0) {
// 			const originalFile = values.file?.[0]?.originFileObj as File
// 			if (originalFile) {
// 				// Конвертация файла в base64
// 				const base64File = await new Promise<string>(resolve => {
// 					const reader = new FileReader()
// 					reader.onload = () => {
// 						const base64String = reader.result as string
// 						const base64Content = base64String.split(',')[1]
// 						resolve(base64Content)
// 					}
// 					reader.readAsDataURL(originalFile)
// 				})

// 				// Добавляем данные файла и типа сертификата
// 				requestData.savingCertificates.push({
// 					certificateName: originalFile.name || '',
// 					certificateTypeId: values.certificateId,
// 					base64File: base64File
// 				})
// 			}
// 		}

// 		console.log('requestData', requestData)

// 		// Отправка данных на сервер
// 		try {
// 			setIsModalOpenEdit(false)
// 			await editForeign(requestData).unwrap()
// 			form2.resetFields()
// 			setFileList([])
// 			setSelectedLabel(null)
// 		} catch (error) {
// 			console.error('Ошибка при сохранении данных:', error)
// 			message.error(t('error'))
// 		} finally {
// 			setIsModalOpenEdit(false)
// 			setDeleteCert([])
// 		}
// 	}

// 	const handleRemove = (file: any) => {
// 		console.log('Удалённый файл ID:', file)
// 		setDeleteCert(prev => [...prev, file.certId])
// 		setFileArray(prev => prev.filter(item => item.certId !== file.certId))
// 		return true // чтобы файл удалился из списка
// 	}

// 	const beforeUpload = (file: File) => {
// 		const isImage = file.type === 'application/pdf'
// 		const isLt5M = file.size / 1024 / 1024 < 5

// 		if (!isImage) {
// 			message.error('Можно загружать только PDF!')
// 			return false
// 		}

// 		if (!isLt5M) {
// 			message.error('Файл должен быть меньше 5MB!')
// 			return false
// 		}

// 		setFileList([file])
// 		return false
// 	}

// 	console.log('selectId', selectId)

// 	return (
// 		<>
// 			<ConfigProvider
// 				theme={{
// 					components: {
// 						Table: {
// 							headerBg: 'rgb(218, 231, 251)'
// 						}
// 					}
// 				}}
// 			>
// 				<Modal
// 					className="!z-[10000000]"
// 					footer={null}
// 					title={t('langZnan')}
// 					open={isModalOpenEdit}
// 					onOk={handleOkEdit}
// 					onCancel={handleCancelEdit}
// 				>
// 					<Form className="mt-4" form={form2} onFinish={onFinishForm2}>
// 						<Form.Item
// 							label={<div className="">{t('language')}</div>}
// 							name="languageCode"
// 							labelCol={{ span: 6 }}
// 							wrapperCol={{ span: 24 }}
// 							layout="vertical"
// 							className="mt-4 h-[35px]"
// 						>
// 							<Select
// 								disabled
// 								suffixIcon={null} 
// 								allowClear
// 								options={dataAll?.map(item => ({
// 									value: item.code,
// 									label: item.language
// 								}))}
// 							/>
// 						</Form.Item>

// 						<Form.Item
// 							label={<div className="">{t('level')}</div>}
// 							name="languageLevelCode"
// 							labelCol={{ span: 12 }}
// 							wrapperCol={{ span: 24 }}
// 							layout="vertical"
// 							className="mt-14 h-[35px]"
// 							// rules={[{ required: true, message: '' }]}
// 						>
// 							<Select
// 								aria-required
// 								options={dataLevels?.map(item => ({
// 									value: item.languageLevelCode,
// 									label: item.languageLevel
// 								}))}
// 								allowClear
// 							/>
// 						</Form.Item>

// 						<Form.Item
// 							label={<div className="">{t('sert')}</div>}
// 							name="certificateId"
// 							labelCol={{ span: 12 }}
// 							wrapperCol={{ span: 24 }}
// 							layout="vertical"
// 							className="mt-14 h-[35px]"
// 							// rules={[{ required: true, message: '' }]}
// 						>
// 							<Select
// 								onSelect={(value: string) => {
// 									const selectedOption = dataCertificate?.find(item => item.id === value)
// 									if (selectedOption) {
// 										console.log('selectedOption',selectedOption)
// 										setSelectedLabel(selectedOption.certificateName)
// 									}
// 								}}
// 								allowClear
// 								options={dataCertificate?.map(item => ({
// 									value: item.id,
// 									label: item.certificateName
// 								}))}
// 							/>
// 						</Form.Item>

// 						{/* <div className="mt-14 mb-2">{t('prikrep')}</div> */}
// 						<div className="mt-14 mb-2"></div>
// 						<Form.Item valuePropName="fileList" name="file" getValueFromEvent={e => e?.fileList}>
// 							<Upload onRemove={handleRemove} maxCount={1} beforeUpload={beforeUpload} accept=".pdf">
// 								{fileArray?.length > 0 ? (
// 									<div>Чтобы добавить, удалите прошлый файл</div>
// 								) : (
// 									<Button className=" " icon={<UploadOutlined />}>
// 										{t('add')} {'(pdf)'}
// 									</Button>
// 								)}
// 							</Upload>
// 						</Form.Item>

// 						<Form.Item className="mt-6" name="isPublished" valuePropName="checked" label={null}>
// 							<Checkbox>{t('razrer')}</Checkbox>
// 						</Form.Item>

// 						<Button loading={isLoadingEdit} type="primary" htmlType="submit">
// 							{t('edit')}
// 						</Button>
// 					</Form>
// 				</Modal>

// 				<div className={'registerContracts animate-fade-in w-full'}>
// 					<Spin className="w-full" spinning={isLoadingDelete || isLoadingGlaz || isLoadingEdit}>
// 						<Table<LanguageData>
// 							pagination={false}
// 							columns={columns}
// 							dataSource={dataForeign?.map((item: any) => ({
// 								...item,
// 								key: item.studLangId
// 							}))}
// 							rowClassName={record => {
// 								return record.isPublished ? '' : 'bg-gray-200 opacity-60'
// 							}}
// 							className="w-full my-custom-table select-none"
// 							locale={{ emptyText: t('noData') }}
// 						/>
// 					</Spin>
// 				</div>
// 			</ConfigProvider>
// 		</>
// 	)
// }

// export default TableLanguages
import { DeleteTwoTone, EditTwoTone, EyeInvisibleTwoTone, EyeTwoTone, UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import {
	Button,
	Checkbox,
	ConfigProvider,
	Form,
	Modal,
	Popconfirm,
	Select,
	Space,
	Spin,
	Table,
	Upload,
	message
} from 'antd'
import type { TableProps } from 'antd'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import { CertificateTs, FormValues, LanguageData, TableLanguagesProps } from '../../../models/aboutMe'
import {
	useDeleteForeignMutation,
	useEditForeignMutation,
	useIsPublishedMutation
} from '../../../store/api/aboutMe/forAboutMe'

import './TableLanguage.scss'
import { getBaseUrl } from '../../../utils/getBaseUrl'

const TableLanguages = ({
	triger,
	handleIdCert,
	isSuccess,
	dataCertificate,
	dataLevels,
	dataAll,
	dataForeign,
	setSelectId,
	selectId
}: TableLanguagesProps) => {
	const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
	const [selectInfo, setSelectInfo] = useState<LanguageData | null>(null)
	const [form2] = Form.useForm()
	const [editForeign, { isLoading: isLoadingEdit }] = useEditForeignMutation()
	const [deleteCert, setDeleteCert] = useState<any[]>([])
	const [deleteForeign, { isLoading: isLoadingDelete }] = useDeleteForeignMutation()
	const [changeGlaz, { isLoading: isLoadingGlaz }] = useIsPublishedMutation()
	const [certificateFiles, setCertificateFiles] = useState<{[key: number]: any}>({})
	const [updatingCertificates, setUpdatingCertificates] = useState([])

	const columns: TableProps<LanguageData>['columns'] = [
		{
			title: t('language'),
			dataIndex: 'language',
			key: 'name',
			render: text => <div>{text}</div>
		},
		{
			title: t('level'),
			dataIndex: 'languageLevel',
			key: 'age'
		},
		{
			title: t('sert'),
			dataIndex: 'certificates',
			key: 'address',
			render: certificates => (
				<>
					{certificates?.map((item: CertificateTs, index: number) => (
						<div
							className="flex gap-2"
							key={index}
							onClick={() => {
								console.log('item?.id', item?.certId)
							}}
						>
							<a
								target="_blank"
								href={`${getBaseUrl()}activities/languages/foreign/certificate?certificateId=${item.certId}`}
							>
								{item.certificateName}
							</a>
							<span>
								({item?.certificateTypeName}) {index === certificates.length - 1 ? '' : ', '}
							</span>
						</div>
					))}
				</>
			)
		},
		{
			title: '',
			key: 'action',
			dataIndex: 'isPublished',
			render: (_, record) => (
				<>
					{record?.isPublished ? (
						<EyeTwoTone
							className={`hover:scale-[140%]`}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								// @ts-ignore
								setSelectId(record?.userLangId)
								changeGlaz(record?.langId)
							}}
						/>
					) : (
						<EyeInvisibleTwoTone
							className={` hover:scale-[140%]`}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								// @ts-ignore
								setSelectId(record?.userLangId)
								changeGlaz(record?.langId)
							}}
						/>
					)}
				</>
			)
		},
		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<EditTwoTone
						className="hover:scale-[140%] transition-transform duration-200 delay-100"
						onClick={() => {
							setSelectId(record.studLangId)
							setSelectInfo(record)
							showModalEdit()
						}}
					/>
				</Space>
			)
		},
		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Popconfirm
						title={t('deleteEducationTitle')}
						description={t('deleteEducationDescription')}
						onConfirm={() => {
							handleDelete(record?.langId)
						}}
					>
						<DeleteTwoTone className="hover:scale-[140%] " />
					</Popconfirm>
				</Space>
			)
		}
	]

	useEffect(() => {
		if (selectInfo) {
			// Подготовка существующих сертификатов для формы
			const certificates = selectInfo?.certificates?.map((certificate: CertificateTs, index: number) => ({
				certificateTypeId: certificate.certificateTypeId,
				existingCertId: certificate.certId,
				existingFile: {
					uid: `-${index}`,
					name: certificate.certificateName,
					status: 'done',
					url: certificate.certificateLink
				}
			})) || []

			form2.setFieldsValue({
				languageCode: selectInfo.language,
				languageLevelCode: selectInfo.languageLevelCode,
				isPublished: selectInfo.isPublished,
				certificates: certificates.length > 0 ? certificates : [{}]
			})

			// Сброс файлов при открытии модального окна
			setCertificateFiles({})
			setUpdatingCertificates([])
		}
	}, [selectInfo, form2])

	const handleDelete = (record: any) => {
		console.log('recordDelete', record)
		deleteForeign(record)
	}

	const showModalEdit = () => {
		setIsModalOpenEdit(true)
		setDeleteCert([])
	}

	const handleOkEdit = () => {
		setIsModalOpenEdit(false)
	}

	const handleCancelEdit = () => {
		setIsModalOpenEdit(false)
		setDeleteCert([])
		setCertificateFiles({})
		form2.resetFields()
		setUpdatingCertificates([])
	}

	const onFinishForm2 = async (values: any) => {
		console.log('values', values)
		
		const requestData: any = {
			langId: selectInfo?.langId,
			languageLevelCode: values.languageLevelCode,
			isPublished: values.isPublished || false,
			savingCertificates: [],
			deletingCertificates: deleteCert,
			updatingCertificates: updatingCertificates || [],
		}

		// Обработка сертификатов
		if (values.certificates && values.certificates.length > 0) {
			for (let i = 0; i < values.certificates.length; i++) {
				const cert = values.certificates[i]
				
				// Пропускаем пустые записи
				if (!cert.certificateTypeId) continue

				// Если есть новый файл для этого индекса
				if (certificateFiles[i]) {
					const file = certificateFiles[i]
					const base64File = await new Promise<string>(resolve => {
						const reader = new FileReader()
						reader.onload = () => {
							const base64String = reader.result as string
							const base64Content = base64String.split(',')[1]
							resolve(base64Content)
						}
						reader.readAsDataURL(file)
					})

					requestData.savingCertificates.push({
						certificateName: file.name || '',
						certificateTypeId: cert.certificateTypeId,
						base64File: base64File
					})
				} else if (!cert.existingCertId) {
					// Если нет файла и нет существующего сертификата, пропускаем
					continue
				}
			}
		}

		console.log('requestData', requestData)

		try {
			await editForeign(requestData).unwrap()
			handleCancelEdit()
			// message.success(t('success'))
		} catch (error) {
			console.error('Ошибка при сохранении данных:', error)
			message.error(t('error'))
		}
	}

	const handleRemoveExisting = (certId: any, fieldIndex: number) => {
		console.log('Удалённый файл ID:', certId)
		setDeleteCert(prev => [...prev, certId])

		// Удаляем из updatingCertificates если там есть этот certId
		// @ts-ignore
		setUpdatingCertificates(prev => prev.filter(item => item.certId !== certId))
		
		// Обновляем значение формы, удаляя existingFile
		const certificates = form2.getFieldValue('certificates')
		certificates[fieldIndex] = {
			...certificates[fieldIndex],
			existingFile: null,
			existingCertId: null,
			certificateTypeId: undefined // Очищаем тип сертификата
		}
		form2.setFieldsValue({ certificates })

		// setTimeout(() => {
		// 	form2.validateFields([['certificates', fieldIndex, 'certificateTypeId']])
		// }, 100)
	}

	const beforeUpload = (file: File, fieldIndex: number) => {
		const isPDF = file.type === 'application/pdf'
		const isLt5M = file.size / 1024 / 1024 < 5

		if (!isPDF) {
			message.error('Можно загружать только PDF!')
			return false
		}

		if (!isLt5M) {
			message.error('Файл должен быть меньше 5MB!')
			return false
		}

		// Сохраняем файл для конкретного индекса
		setCertificateFiles(prev => ({
			...prev,
			[fieldIndex]: file
		}))

		return false
	}

	const handleFileRemove = (fieldIndex: number) => {
		setCertificateFiles(prev => {
			const newFiles = { ...prev }
			delete newFiles[fieldIndex]
			return newFiles
		})

		// Очищаем тип сертификата при удалении файла
		const certificates = form2.getFieldValue('certificates')
		if (certificates && certificates[fieldIndex]) {
			certificates[fieldIndex] = {
				...certificates[fieldIndex],
				certificateTypeId: undefined // Очищаем тип сертификата
			}
			form2.setFieldsValue({ certificates })
		}
	}

	// Обработчик изменения типа сертификата
	const handleCertificateTypeChange = (value: number, fieldIndex: number) => {
		const certificates = form2.getFieldValue('certificates')
		const currentCert = certificates[fieldIndex]
		
		// Если есть существующий сертификат с бэкенда
		if (currentCert?.existingCertId) {
			const certId = currentCert.existingCertId
			
			// Удаляем предыдущую запись для этого certId из updatingCertificates
			// @ts-ignore
			setUpdatingCertificates(prev => prev.filter(item => item.certId !== certId))
			
			// Добавляем новую запись в updatingCertificates
			if (value) {
				// @ts-ignore
				setUpdatingCertificates(prev => [...prev, {
					certId: certId,
					certificateTypeId: value
				}])
			}
		}
	}

	

	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Table: {
							headerBg: 'rgb(218, 231, 251)'
						}
					}
				}}
			>
				<Modal
					className="!z-[10000000]"
					footer={null}
					title={t('langZnan')}
					open={isModalOpenEdit}
					onOk={handleOkEdit}
					onCancel={handleCancelEdit}
					width={600}
				>
					<Form className="mt-4" form={form2} onFinish={onFinishForm2}>
						<Form.Item
							label={<div className="">{t('language')}</div>}
							name="languageCode"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-4 h-[35px]"
						>
							<Select
								disabled
								suffixIcon={null} 
								allowClear
								options={dataAll?.map(item => ({
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
						>
							<Select
								aria-required
								options={dataLevels?.map(item => ({
									value: item.languageLevelCode,
									label: item.languageLevel
								}))}
								allowClear
							/>
						</Form.Item>

						<div className="mt-14 mb-4 font-medium">{t('sert')}</div>
						
						<Form.List name="certificates">
							{(fields, { add, remove }) => (
								<>
									{fields.map(({ key, name, ...restField }, index) => (
										<div key={key} className="mb-4 p-4 border rounded-lg relative">
											{fields.length > 1 && (
												<MinusCircleOutlined
													className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer"
													onClick={() => {
														const cert = form2.getFieldValue(['certificates', name])
														if (cert?.existingCertId) {
															setDeleteCert(prev => [...prev, cert.existingCertId])
															// Удаляем из updatingCertificates
															// @ts-ignore
															setUpdatingCertificates(prev => prev.filter(item => item.certId !== cert.existingCertId))
														}
														remove(name)
														handleFileRemove(index)
													}}
												/>
											)}
											
											<Form.Item
												{...restField}
												name={[name, 'certificateTypeId']}
												label={`${t('sert')} ${index + 1}`}
												// rules={[
												// 	{
												// 		required: certificateFiles[index] || form2.getFieldValue(['certificates', name, 'existingFile']),
												// 		message: 'Выберите тип сертификата'
												// 	}
												// ]}
												rules={[
													{
														validator: (_, value) => {
															const hasFile = certificateFiles[index] || form2.getFieldValue(['certificates', name, 'existingFile'])
															
															if (hasFile && !value) {
																return Promise.reject(new Error('Выберите тип сертификата для загруженного файла'))
															}
															
															return Promise.resolve()
														}
													}
												]}
											>
												<Select
													disabled={!certificateFiles[index] && !form2.getFieldValue(['certificates', name, 'existingFile'])}
													allowClear
													options={dataCertificate?.map(item => ({
														value: item.id,
														label: item.certificateName
													}))}
													onChange={value=>{
																 handleCertificateTypeChange(value, index)										}}
													
													placeholder={t('zagrFile')}
												/>
											</Form.Item>

											<Form.Item
												label={t('prikrep')}
											>
												{form2.getFieldValue(['certificates', name, 'existingFile']) && !certificateFiles[index] ? (
													<div className="flex items-center gap-2">
														<a 
															href={form2.getFieldValue(['certificates', name, 'existingFile'])?.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															{form2.getFieldValue(['certificates', name, 'existingFile'])?.name}
														</a>
														<Button 
															size="small" 
															danger
															onClick={() => handleRemoveExisting(
																form2.getFieldValue(['certificates', name, 'existingCertId']),
																index
															)}
														>
															{t('delete')}
														</Button>
													</div>
												) : (
													<Upload
														maxCount={1}
														beforeUpload={(file) => beforeUpload(file, index)}
														onRemove={() => handleFileRemove(index)}
														fileList={certificateFiles[index] ? [{
															uid: '-1',
															name: certificateFiles[index].name,
															status: 'done'
														}] : []}
														accept=".pdf"
													>
														<Button icon={<UploadOutlined />}>
															{t('add')} (pdf)
														</Button>
													</Upload>
												)}
											</Form.Item>
										</div>
									))}
									
									<Form.Item>
										<Button 
											type="dashed" 
											onClick={() => add()} 
											block 
											icon={<PlusOutlined />}
										>
											{t('add')}
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>

						<Form.Item className="mt-6" name="isPublished" valuePropName="checked" label={null}>
							<Checkbox>{t('razrer')}</Checkbox>
						</Form.Item>

						<Button loading={isLoadingEdit} type="primary" htmlType="submit">
							{t('edit')}
						</Button>
					</Form>
									</Modal>

				<div className={'registerContracts animate-fade-in w-full'}>
					<Spin className="w-full" spinning={isLoadingDelete || isLoadingGlaz || isLoadingEdit}>
						<Table<LanguageData>
							pagination={false}
							columns={columns}
							dataSource={dataForeign?.map((item: any) => ({
								...item,
								key: item.studLangId
							}))}
							rowClassName={record => {
								return record.isPublished ? '' : 'bg-gray-200 opacity-60'
							}}
							className="w-full my-custom-table select-none"
							locale={{ emptyText: t('noData') }}
						/>
					</Spin>
				</div>
			</ConfigProvider>
		</>
	)
}

export default TableLanguages