import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Form, Modal, Row, Spin, Tooltip, Upload, message } from 'antd'
import { Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import { Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import {
	useGetAllNativeLanguagesQuery,
	useGetNativeLanguagesQuery,
	useGetforeignLanguagesQuery,
	useSetNativeMutation
} from '../../../store/api/aboutMe/forAboutMe'

import './Languages.css'
import { SkeletonPage } from './Skeleton'
import TableLanguages from './TableLanguages'
import UploadAvatar from './UploadAvatar'

const Languages = () => {
	const [form] = Form.useForm()
	const [form2] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectId, setSelectId] = useState(null)
	const [fileList, setFileList] = useState<any>([])
	const { data: dataNative, isLoading: isFetchingNative, refetch } = useGetNativeLanguagesQuery()
	const { data: dataAll } = useGetAllNativeLanguagesQuery()
	const { data: dataForeign } = useGetforeignLanguagesQuery()
	const [setNative, { isLoading }] = useSetNativeMutation()
	const nativeLanguageForm = Form.useWatch('languages', form)

	useEffect(() => {
		console.log('dataNative updated:', dataNative)
		if (dataNative) {
			const initialValues = {
				languages: dataNative.languages?.map((lang: any) => lang.code) || []
			}
			form.setFieldsValue(initialValues)
		}
	}, [dataNative])

	const onFinish = () => {
		// values содержит { checkboxes: [...] }
		setNative({ languageCodes: nativeLanguageForm }).unwrap()
	}

	const onFinishForm2 = (values: any) => {
		console.log('Данные формы form2:', values)
		const formData = new FormData()
		if (fileList.length > 0) {
			formData.append('file', values.file[0].originFileObj)
		}
		Object.entries(values)
			.filter(([key]) => key !== 'file') // Исключаем поле с файлом 
			.forEach(([key, value]) => {
				const items = Array.isArray(value) ? value : [value] // Приводим к массиву 
				items.forEach(item => formData.append(key, item)) // Добавляем все элементы
			})
		console.log([...formData])
		formData.forEach((value, key) => {
			console.log(`Ключ: ${key}, Значение: ${value}`);
			});
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
	}
	const beforeUpload = (file: File) => {
		const isImage = file.type.startsWith('image/')
		const isLt5M = file.size / 1024 / 1024 < 5

		if (!isImage) {
			message.error('Можно загружать только изображения!')
			return false
		}

		if (!isLt5M) {
			message.error('Файл должен быть меньше 5MB!')
			return false
		}
		setFileList([file])
		return false
	}

	if (isFetchingNative)
		return (
			<div className="mt-[-10px] ml-[6px]">
				<SkeletonPage />
			</div>
		)

	return (
		<div className="px-[50px] pt-[60px] mb-[50px]">
			<div className=" rounded-xl  animate-fade-in">
				<Spin spinning={isLoading} className="flex gap-2">
					<Row className="mb-0 mt-3">
						<Col span={24}>
							<div className="text-[16px] font-bold mb-2">{t('nativeLanguage')}</div>
							<Form form={form} onFinish={onFinish} className="flex gap-8 flex-wrap ">
								<div className="w-full h-auto">
									<Form.Item
										name="languages"
										className="mb-0 w-full !h-auto"
										rules={[
											{
												validator: (_, value) =>
													value?.length > 10 ? Promise.reject(new Error(t('maxLanguagesError'))) : Promise.resolve()
											}
										]}
									>
										<Select
											mode="multiple"
											allowClear
											className=" !h-auto"
											options={dataAll?.map((item: any) => ({
												value: item.code,
												label: item.language
											}))}
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
							</Form>
						</Col>
					</Row>
					<Row>
						<Button className="mt-4 w-[100px]" type="primary" htmlType="submit">
							{t('save')}
						</Button>
					</Row>
				</Spin>
			</div>

			<div className=" rounded-xl  mt-16 animate-fade-in">
				<Spin spinning={false}>
					<Row className="mb-3">
						<Title className="!mb-0" level={5}>
							{t('foreignLanguage')}
						</Title>
					</Row>
					<Row>
						<TableLanguages selectId={selectId} setSelectId={setSelectId} dataForeign={dataForeign} />
					</Row>
					<Row className="flex items-center justify-start mt-4 gap-2">
						<div
							onClick={showModal}
							className="gap-2 flex items-center cursor-pointer hover:animate-pulse transition delay-150 "
						>
							<Button className="rounded-[50%] !w-[28px] hover:animate-pulse transition delay-150 " type="primary">
								+
							</Button>
							<span>{t('add')}</span>
						</div>
					</Row>
				</Spin>

				<Modal
					className=""
					footer={null}
					title={t('langZnan')}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<Form className="mt-4" form={form2} onFinish={onFinishForm2}>
						<Form.Item
							label={<div className="">{t('language')}</div>}
							name="languagesForm"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-4"
						>
							<Select
								
								allowClear
								options={dataAll?.map((item: any) => ({
									value: item.code,
									label: item.language
								}))}
							/>
						</Form.Item>

						<Form.Item
							label={<div className="">{t('level')}</div>}
							name="levelForm"
							labelCol={{ span: 12 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-14"
						>
							<Select
							
								options={dataAll?.map((item: any) => ({
									value: item.languageLevelCode,
									label: item.languageLevel
								}))}
								allowClear
								
							/>
						</Form.Item>

						<Form.Item
							label={<div className="">{t('sert')}</div>}
							name="sertificateForm"
							labelCol={{ span: 12 }}
							wrapperCol={{ span: 24 }}
							layout="vertical"
							className="mt-14"
						>
							<Select
								
								allowClear
								options={dataAll?.map((item: any) => ({
									value: item.certificateCode,
									label: item.certificateName
								}))}
							/>
						</Form.Item>

						<div className="mt-14 mb-2">{t('prikrep')}</div>
						<Form.Item name="file" getValueFromEvent={e => e?.fileList}>
							<Upload maxCount={1} beforeUpload={beforeUpload} accept="image/png, image/jpeg, image/webp">
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
				</Modal>
			</div>
		</div>
	)
}

export default Languages
