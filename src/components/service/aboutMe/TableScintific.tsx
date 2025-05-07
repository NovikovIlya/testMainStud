import { DeleteTwoTone, EditTwoTone, EyeInvisibleTwoTone, EyeTwoTone } from '@ant-design/icons'
import {
	Button,
	Checkbox,
	ConfigProvider,
	Form,
	Input,
	Modal,
	Popconfirm,
	Radio,
	Select,
	Space,
	Spin,
	Table, message
} from 'antd'
import type { TableProps } from 'antd'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { CertificateTs, LanguageData } from '../../../models/aboutMe'
import {
	useDeleteForeignMutation,
	useEditForeignMutation,
	useIsPublishedMutation
} from '../../../store/api/aboutMe/forAboutMe'

import './TableLanguage.scss'
import { generateYearsArray } from '../../../utils/generateYearsArray'

const TableScintific = ({
	isSuccess,
	dataLevels,
	dataScientific,
	setSelectId,
	selectId
}: any) => {
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
			title: t('Year'),
			dataIndex: 'year',
			key: 'name',
			render: text => <div>{text}</div>
		},
		{
			title: t('themes'),
			dataIndex: 'theme',
			key: 'age'
		},
		{
			title: t('direction'),
			dataIndex: 'direction',
			key: 'address',
			
		},
		{
			title: t('naych'),
			dataIndex: 'scientificDirectorName',
			key: 'address',
			
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
						title={t('scient')}
						open={isModalOpenEdit}
						onOk={handleOkEdit}
						onCancel={handleCancelEdit}
					>
						<Form className="mt-4" form={form2} onFinish={onFinishForm2} initialValues={{ languageCode: 1 }}>
							<Form.Item
								label={<div className="">{t('language')}</div>}
								name="languageCode"
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 24 }}
								layout="vertical"
								className="mt-4 h-[35px]"
								rules={[{ required: true, message: '' }]}
							>
								<Radio.Group
									options={[
										{ value: 1, label: t('rus') },
										{ value: 2, label: t('eng') }
									]}
								/>
							</Form.Item>

							<Form.Item
								label={<div className="">{t('Year')}</div>}
								name="languageLevelCode"
								labelCol={{ span: 12 }}
								wrapperCol={{ span: 24 }}
								layout="vertical"
								className="mt-14"
								// rules={[{ required: true, message: '' }]}
							>
								<Select
									placeholder={t('select')}
									aria-required
									options={generateYearsArray()}
									allowClear
								/>
							</Form.Item>

							<div className="mt-12">{t('theme')}</div>
							<Form.Item name="theme" className=" mb-6" rules={[{ required: true, message: '' }]}>
								<Input.TextArea rows={4} placeholder="Введите текст здесь" maxLength={200}/>
							</Form.Item>

							<div className="">{t('direction')}</div>
							<Form.Item name="direction" className=" h-[35px]" rules={[{ required: true, message: '' }]}>
								<Input.TextArea rows={4} placeholder="Введите текст здесь" maxLength={200}/>
							</Form.Item>

							<Form.Item
								label={<div className="">{t('naych')}</div>}
								name="naych"
								labelCol={{ span: 12 }}
								wrapperCol={{ span: 24 }}
								layout="vertical"
								className="mt-20"
								// rules={[{ required: true, message: '' }]}
							>
								<Select
									placeholder={t('select')}
									aria-required
									options={dataLevels?.map((item: any) => ({
										value: item.languageLevelCode,
										label: item.languageLevel
									}))}
									allowClear
								/>
							</Form.Item>

							<Form.Item className="" name="isPublished" valuePropName="checked" label={null}>
								<Checkbox className="mt-12">{t('razrer')}</Checkbox>
							</Form.Item>

							<Button type="primary" htmlType="submit">
								{t('add')}
							</Button>
						</Form>
					</Modal>

				<div className={'registerContracts animate-fade-in w-full'}>
					<Spin className="w-full" spinning={isLoadingDelete || isLoadingGlaz || isLoadingEdit}>
						<Table<LanguageData>
							pagination={false}
							columns={columns}
							dataSource={dataScientific?.map((item: any) => ({
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

export default TableScintific
