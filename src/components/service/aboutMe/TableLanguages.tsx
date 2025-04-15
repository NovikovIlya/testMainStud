import {
	DeleteTwoTone,
	EditTwoTone,
	UploadOutlined
} from '@ant-design/icons'
import { Button, Checkbox, ConfigProvider, Form, Modal, Select, Space, Table, Upload, message } from 'antd'
import type { TableProps } from 'antd'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import './TableLanguage.scss'
import { CertificateTs, FormValues, LanguageData, TableLanguagesProps } from '../../../models/aboutMe'




const TableLanguages: React.FC<TableLanguagesProps> = ({isSuccess, dataCertificate, dataLevels, dataAll, dataForeign, setSelectId, selectId }) => {
	const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
	const [selectInfo, setSelectInfo] = useState<LanguageData | null>(null)
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
	const [form2] = Form.useForm()
	const [fileList, setFileList] = useState<any[]>([])
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
						<div key={index}>
							<a target="_blank" href={item.certificateLink} rel="noopener noreferrer">
								{item.certificateName} {index === certificates.length - 1 ? '' : ', '}
							</a>
						</div>
					))}
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
					<DeleteTwoTone onClick={()=>handleDelete(record)} className="hover:scale-[140%] " />
				</Space>
			)
		}
	]

	useEffect(() => {
		if (selectInfo) {
			const fileList = selectInfo.certificates.map((certificate: CertificateTs, index: number) => ({
				uid: `-${index}`, // Уникальный ID для каждого файла
				name: certificate.certificateName, // Имя файла
				status: 'done', // Статус загрузки
				url: certificate.certificateLink, // URL файла
			}));
			form2.setFieldsValue({
				languageCode: selectInfo.code,
				languageLevelCode: selectInfo.languageLevel,
				certificateId: selectInfo.certificates?.[0]?.id || null, // Если сертификатов нет, устанавливаем null
				isPublished: selectInfo.isPublished,
				file: fileList,
			});
		}
	}, [isSuccess, selectInfo, form2])

	const handleDelete = (record:any)=>{
		console.log('recordDelete', record)
	}

	const showModalEdit = () => {
		setIsModalOpenEdit(true)
	}

	const handleOkEdit = () => {
		setIsModalOpenEdit(false)
	}

	const handleCancelEdit = () => {
		setIsModalOpenEdit(false)
	}
	
	const onFinishForm2 = (values: FormValues) => {
		console.log('value', values)
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
	console.log('selectInfo', selectInfo)
	

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
							rules={[{ required: true, message: '' }]}
						>
							<Select
								allowClear
								options={dataAll?.map((item) => ({
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
								options={dataLevels?.map((item) => ({
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
							rules={[{ required: true, message: '' }]}
						>
							<Select
								onSelect={(value: string) => {
									const selectedOption = dataCertificate.find((item) => item.id === value)
									if (selectedOption) {
										setSelectedLabel(selectedOption.certificateName)
									}
								}}
								allowClear
								options={dataCertificate?.map((item) => ({
									value: item.id,
									label: item.certificateName
								}))}
							/>
						</Form.Item>

						{/* <div className="mt-14 mb-2">{t('prikrep')}</div> */}
						<div className="mt-14 mb-2"></div> 
						<Form.Item valuePropName="fileList" name="file" getValueFromEvent={e => e?.fileList}>
							<Upload maxCount={1} beforeUpload={beforeUpload} accept=".pdf">
								<Button className=" " icon={<UploadOutlined />}>

								{fileList.length > 0 ? t('change') : t('add')}

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
				</Modal>
				<div className={'registerContracts animate-fade-in w-full'}>
					<Table<LanguageData>
						pagination={false}
						columns={columns}
						dataSource={dataForeign?.map((item) => ({
							...item,
							key: item.studLangId
						}))}
						// rowClassName={record => {
						// 	return record.isPublished ? '' : 'bg-gray-200 opacity-60'
						// }}
						className="w-full my-custom-table select-none"
						locale={{ emptyText: t('noData') }}
					/>
				</div>
			</ConfigProvider>
		</>
	)
}

export default TableLanguages