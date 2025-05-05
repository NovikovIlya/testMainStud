import { DeleteTwoTone, EditTwoTone, EyeInvisibleTwoTone, EyeTwoTone, UploadOutlined } from '@ant-design/icons'
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
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
	const [form2] = Form.useForm()
	const [fileList, setFileList] = useState<any[]>([])
	const [editForeign, { isLoading: isLoadingEdit }] = useEditForeignMutation()
	const [deleteCert, setDeleteCert] = useState<any[]>([])
	const [deleteForeign, { isLoading: isLoadingDelete }] = useDeleteForeignMutation()
	const [changeGlaz, { isLoading: isLoadingGlaz }] = useIsPublishedMutation()
	const [fileArray, setFileArray] = useState<any[]>([])
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
								// handleIdCert(item?.certId)
								console.log('item?.id', item?.certId)
								// triger(item?.certId)
							}}
						>
							<a
								target="_blank"
								href={`https://newlk.kpfu.ru/activities/languages/foreign/certificate?certificateId=${item.certId}`}
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
					{/* @ts-ignore */}
					{record?.isPublished ? (
						<EyeTwoTone
							// @ts-ignore
							className={`hover:scale-[140%]`}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								// @ts-ignore
								setSelectId(record?.userLangId)
								// @ts-ignore
								changeGlaz(record?.langId)
							}}
						/>
					) : (
						<EyeInvisibleTwoTone
							// @ts-ignore
							className={` hover:scale-[140%]`}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								// @ts-ignore
								setSelectId(record?.userLangId)
								// @ts-ignore
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
		if (selectInfo?.certificates) {
			setFileArray(selectInfo?.certificates)
		}
	}, [selectInfo?.certificates])
	console.log('selectInfo',selectInfo)
	useEffect(() => {
		if (selectInfo) {
			const fileList = selectInfo?.certificates?.map((certificate: CertificateTs, index: number) => ({
				certId: certificate.certId,
				uid: `-${index}`, // Уникальный ID для каждого файла
				name: certificate.certificateName, // Имя файла
				status: 'done', // Статус загрузки
				url: certificate.certificateLink // URL файла
			}))
			form2.setFieldsValue({
				languageCode: selectInfo.language,
				languageLevelCode: selectInfo.languageLevelCode,
				certificateId: selectInfo.certificates?.[0]?.certificateTypeId || null, // Если сертификатов нет, устанавливаем null
				isPublished: selectInfo.isPublished,
				file: fileList
			})
		}
	}, [isSuccess, selectInfo, form2])

	const handleDelete = (record: any) => {
		console.log('recordDelete', record)
		deleteForeign(record)
	}

	const showModalEdit = () => {
		setIsModalOpenEdit(true)
	}

	const handleOkEdit = () => {
		setIsModalOpenEdit(false)
	}

	const handleCancelEdit = () => {
		setIsModalOpenEdit(false)
		setDeleteCert([])
	}

	const onFinishForm2 = async (values: any) => {
		console.log('values', values)
		// Подготовка базовой структуры данных в новом формате
		const requestData: any = {
			langId: selectInfo?.langId,
			languageLevelCode: values.languageLevelCode,
			isPublished: values.isPublished || false,
			savingCertificates: [], // Массив для сохраняемых сертификатов
			deletingCertificates: deleteCert // Массив для удаляемых сертификатов (пустой при добавлении нового языка)
		}

		// Обработка файла сертификата, если он есть
		if (fileList.length > 0) {
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

				// Добавление информации о сертификате в массив savingCertificates
				requestData.savingCertificates = [
					{
						// certId: values.certificateId,
						certificateName: originalFile.name || '',
						certificateTypeId: values.certificateId,
						base64File: base64File
					}
				]
			}
		}

		// Отправка данных на сервер
		try {
			setIsModalOpenEdit(false)
			await editForeign(requestData).unwrap()

			form2.resetFields()
			setFileList([])
			setSelectedLabel(null)
		} catch (error) {
			console.error('Ошибка при сохранении данных:', error)
			message.error(t('error'))
		} finally {
			setIsModalOpenEdit(false)
		}
	}

	const handleRemove = (file: any) => {
		console.log('Удалённый файл ID:', file)
		setDeleteCert(prev => [...prev, file.certId])
		setFileArray(prev => prev.filter(item => item.certId !== file.certId))
		return true // чтобы файл удалился из списка
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

	console.log('selectId', selectId)

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
							// rules={[{ required: true, message: '' }]}
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
								onSelect={(value: string) => {
									const selectedOption = dataCertificate?.find(item => item.id === value)
									if (selectedOption) {
										setSelectedLabel(selectedOption.certificateName)
									}
								}}
								allowClear
								options={dataCertificate?.map(item => ({
									value: item.id,
									label: item.certificateName
								}))}
							/>
						</Form.Item>

						{/* <div className="mt-14 mb-2">{t('prikrep')}</div> */}
						<div className="mt-14 mb-2"></div>
						<Form.Item valuePropName="fileList" name="file" getValueFromEvent={e => e?.fileList}>
							<Upload onRemove={handleRemove} maxCount={1} beforeUpload={beforeUpload} accept=".pdf">
								{fileArray?.length > 0 ? (
									<div>Чтобы добавить, удалите прошлый файл</div>
								) : (
									<Button className=" " icon={<UploadOutlined />}>
										{t('add')} {'(pdf)'}
									</Button>
								)}
							</Upload>
						</Form.Item>

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
